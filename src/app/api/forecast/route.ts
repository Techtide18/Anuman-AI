import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("\n=============================================");
    console.log("[1/6] RECEIVED DATA FROM UI:");
    console.log(JSON.stringify(data, null, 2));
    console.log("=============================================\n");

    if (!process.env.GEMINI_API_KEY) {
      console.error("ERROR: GEMINI_API_KEY is missing.");
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
    }
    
    // Step 1 & 2: Generate Query and Hit Indian Kanoon with Retry Loop
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    let ikDocs: any[] = [];
    const IK_TOKEN = process.env.IK_API_TOKEN;
    
    if (!IK_TOKEN) {
      return NextResponse.json({ error: 'IK_API_TOKEN is not set.' }, { status: 500 });
    }

    let searchInput = '';
    let attempt = 0;
    const MAX_ATTEMPTS = 5;
    let previousQuery = "";
    
    while (attempt < MAX_ATTEMPTS && ikDocs.length === 0) {
      attempt++;
      console.log(`\n[2/6] EXECUTING GEMINI API (Step 1) [Attempt ${attempt}/${MAX_ATTEMPTS}]...`);
      
      let verticalDetails = '';
      if (data.vertical === 'cheque_bounce') {
        verticalDetails = `
        Cheque Amount: ₹${data.chequeAmount}
        Reason for Dishonour: ${data.dishonourReason}
        Notice Served: ${data.noticeServed ? 'Yes' : 'No'}
        Defence Raised: ${data.defenceRaised ? data.defenceRaised : 'None'}`;
      } else if (data.vertical === 'commercial') {
        verticalDetails = `
        Claim Amount: ₹${data.claimAmount}
        Contract Type: ${data.contractType}
        Written Contract: ${data.writtenContract ? 'Yes' : 'No'}
        Mediation Attempted: ${data.mediationAttempted ? 'Yes' : 'No'}
        Counterclaim Expected: ${data.counterclaimExpected ? 'Yes' : 'No'}
        Nature of Dispute: ${data.natureOfDispute ? data.natureOfDispute : 'None'}`;
      } else if (data.vertical === 'family') {
        verticalDetails = `
        Petitioner Income: ₹${data.petitionerIncome}
        Respondent Income: ₹${data.respondentIncome}
        Years of Marriage: ${data.yearsOfMarriage}
        Number of Children: ${data.numChildren}
        Type of Proceeding: ${data.typeOfProceeding}
        Nature of Relief Sought: ${data.natureOfRelief ? data.natureOfRelief : 'None'}`;
      }

      const queryPrompt = `
      You are an expert Indian Legal AI. Based on the following case details, generate the perfect boolean search string for the Indian Kanoon API.
      
      ${attempt > 1 ? `CRITICAL: Your previous query (${previousQuery}) returned 0 results! You MUST trim it down. Remove some specific ANDD keywords or replace them with ORR. Make it significantly broader. Keep it to a maximum of 2 or 3 ANDD blocks.` : ''}

      RULES:
      1. ONLY use Boolean operators ANDD and ORR. You MUST heavily favor ANDD to ensure strict matching. Rarely use ORR unless absolutely necessary for a direct synonym.
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. Use ANDD for the 'Nature of Dispute' or equivalent fields to strictly mandate that the exact legal issue is present in the case.
      5. CRITICAL: If category is cheque_bounce, ALWAYS include "Section 138". If category is commercial, ALWAYS include "Section 12A" ANDD "Commercial Courts Act".
      6. EXTRACT UNIQUE FACTS: Read the user's Description carefully. Extract 1 unique factual noun (e.g., the specific product sold, industry, or relationship like "textiles", "software", "brother-in-law") and include it with an ANDD condition to find highly context-specific precedents!
      
      Case Category: ${data.vertical}
      State: ${data.stateUT}
      Court Level: ${data.courtLevel}
      ${verticalDetails}
      
      Output a valid JSON object with exactly two keys:
      {
        "query": "The boolean search string for Indian Kanoon without any parentheses",
        "keywordReasoning": "Why you chose these keywords"
      }
      `;

      const queryResult = await model.generateContent(queryPrompt);
      
      let queryJson;
      try {
        queryJson = JSON.parse(queryResult.response.text().replace(/```json/g, '').replace(/```/g, '').trim());
      } catch (e) {
        queryJson = { query: `"Section 138" ANDD "dishonour" ORR "bounce" ANDD "Delhi"`, keywordReasoning: "Fallback" };
      }

      // Force strip any parentheses the LLM might have hallucinated
      searchInput = queryJson.query.replace(/[()]/g, '');
      
      // Only force court-level filter on the first attempt. On retries, broaden search to all courts in state.
      if (attempt === 1 && data.courtLevel) {
        if (data.courtLevel.includes('High Court')) searchInput += ' doctypes:delhi';
        else if (data.courtLevel.includes('District') || data.courtLevel.includes('Hazari') || data.courtLevel.includes('Court')) searchInput += ' doctypes:delhidc';
      }

      console.log("-> Reasoning:", queryJson.keywordReasoning);
      console.log("-> Query:", searchInput);
      
      const searchUrl = `https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(searchInput)}&fromdate=1-1-2024&pagenum=0&maxpages=1`;
      console.log(`[3/6] EXECUTING INDIAN KANOON API: ${searchUrl}`);

      const searchRes = await fetch(searchUrl, { method: 'POST', headers: { 'Authorization': `Token ${IK_TOKEN}`, 'Accept': 'application/json' } });

      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        const topDocs = searchJson.docs || [];
        console.log(`-> Received ${topDocs.length} search results.`);
        
        if (topDocs.length > 0) {
          console.log(`   Fetching top ${topDocs.length} full documents...`);
          const docPromises = topDocs.map(async (doc: any) => {
            const docRes = await fetch(`https://api.indiankanoon.org/doc/${doc.tid}/`, { method: 'POST', headers: { 'Authorization': `Token ${IK_TOKEN}`, 'Accept': 'application/json' } });
            if (docRes.ok) {
              const docJson = await docRes.json();
              return { title: doc.title, tid: doc.tid, text: docJson.doc };
            }
            return null;
          });
          const fetchedDocs = await Promise.all(docPromises);
          ikDocs = fetchedDocs.filter(d => d !== null);
          console.log(`\n[4/6] SUCCESSFULLY FETCHED ${ikDocs.length} FULL DOCUMENTS.`);
        } else {
          previousQuery = searchInput;
          console.log(`-> 0 Results found. Will retry if attempts remain...`);
        }
      } else {
        console.warn("Kanoon API search failed:", await searchRes.text());
        previousQuery = searchInput;
      }
    }

    if (ikDocs.length === 0) {
      console.error("[4/6] ERROR: Kanoon returned 0 results after all attempts.");
      return NextResponse.json({ error: 'Indian Kanoon returned 0 results after 5 LLM retry attempts. Try broadening your case details.' }, { status: 404 });
    }

    // Step 3: Use Gemini 3.6 Flash to analyze the cases and return JSON output
    const analysisPrompt = `
    You are an expert Indian Legal AI. Read the full text of the following precedents fetched from Indian Kanoon.
    You MUST extract the actual outcomes, award amounts, and timeline durations from THESE SPECIFIC DOCUMENTS to calculate your metrics. 
    Do NOT hallucinate generic metrics. Perform strict mathematical aggregation based on the text provided below.

    USER CASE:
    Vertical: ${data.vertical}
    State: ${data.stateUT}, Court: ${data.courtLevel}, Stage: ${data.currentStage}
    Description: ${data.description}
    ${data.vertical === 'cheque_bounce' ? `Cheque Amount: ₹${data.chequeAmount}\nReason for Dishonour: ${data.dishonourReason}\nLegal Notice Served: ${data.noticeServed ? 'Yes' : 'No'}\nDefence Being Raised: ${data.defenceRaised ? data.defenceRaised : 'None'}` : ''}
    ${data.vertical === 'commercial' ? `Claim Amount: ₹${data.claimAmount}\nContract Type: ${data.contractType}\nWritten Contract: ${data.writtenContract ? 'Yes' : 'No'}\nMediation Attempted: ${data.mediationAttempted ? 'Yes' : 'No'}\nCounterclaim Expected: ${data.counterclaimExpected ? 'Yes' : 'No'}\nNature of Dispute: ${data.natureOfDispute ? data.natureOfDispute : 'None'}` : ''}
    ${data.vertical === 'family' ? `Petitioner Income: ₹${data.petitionerIncome}\nRespondent Income: ₹${data.respondentIncome}\nYears of Marriage: ${data.yearsOfMarriage}\nNumber of Children: ${data.numChildren}\nType of Proceeding: ${data.typeOfProceeding}\nNature of Relief Sought: ${data.natureOfRelief ? data.natureOfRelief : 'None'}` : ''}

    INDIAN KANOON PRECEDENTS FOUND (READ THESE CAREFULLY TO DERIVE YOUR NUMBERS):
    ${ikDocs.map(d => `Title: ${d.title}\nID: ${d.tid}\nText excerpt: ${d.text.substring(0, 20000)}...\n---`).join('\n')}

    IMPORTANT: To calculate "Likely Award" (awardMin, awardMax, awardMedian) and Settlement ranges, you MUST calculate them mathematically based ONLY on the actual awards granted in the precedents above.
    1. If Cheque Bounce: Apply the exact average percentage/multiplier of awards from precedents to the user's base cheque amount (₹${data.chequeAmount || 0}).
    2. If Commercial: Evaluate typical recovery percentages vs claimed amounts (₹${data.claimAmount || 0}) in similar breach of contract/recovery suits, including interest (pendente lite) and arbitration costs.
    3. If Family: Calculate alimony/maintenance using typical formulas (e.g. 1/3rd or 1/4th of respondent income ₹${data.respondentIncome || 0}) or lump sum equivalents based on the precedents.
    4. Calculate the Settlement parameters (Claimant Floor, Respondent Ceiling, Recommended Min/Max) based strictly on your calculated Likely Award, adjusted by the realistic cost of delay derived from these specific courts.

    Ensure similarCases links use format: https://indiankanoon.org/doc/[ID]/
    CRITICAL: You MUST include ALL the provided precedents in the "similarCases" array. Do not leave any of them out.
    
    You MUST include a "calculationLog" array of strings in your JSON where you explain step-by-step how you calculated the success probability, likely award, and settlement figures. Explicitly mention how the user's specific facts influenced the final math based on the precedents.

    Output a valid JSON object matching the exact structure expected by the UI, plus the calculationLog:
    {
      "calculationLog": ["step 1...", "step 2..."],
      "forecast": { "successProbability": number /* e.g. 68 for 68% */, "awardMin": number, "awardMax": number, "awardMedian": number },
      "backlog": { "disposalTimeMonths": number, "pendingOver3YearsPercent": number },
      "settlement": { "claimantFloor": number, "respondentCeiling": number, "recommendedMin": number, "recommendedMax": number, "costOfDelay": number, "delayYears": number },
      "arguments": { "title": string, "sampleSize": number, "successRate": number, "kanoonLink": string },
      "similarCases": [ { "title": string, "year": string, "outcome": string (Provide a descriptive 1-2 sentence summary of the judge's reasoning. MUST include the word 'Convicted/Ruled for Plaintiff/Granted' if claimant won, 'Acquitted/Dismissed' if they lost, or 'Settled'), "sim": string, "link": string, "awardAmount": number (the actual monetary award granted in this case, 0 if dismissed or unknown), "outcomeType": "won" | "lost" | "settled" } ]
    }
    `;

    console.log("[5/6] EXECUTING GEMINI API (Step 3 - Analyzing Cases & Generating Forecast)...");
    console.log("Model: gemini-3.6-flash");
    
    const result = await model.generateContent(analysisPrompt);
    
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const finalJson = JSON.parse(cleanedText);
      
      console.log("\n[LLM CALCULATION LOG]:");
      if (finalJson.calculationLog) {
        finalJson.calculationLog.forEach((log: string, idx: number) => console.log(`   ${idx + 1}. ${log}`));
      } else {
        console.log("   No calculation log provided by LLM.");
      }

      console.log("\n[6/6] FINAL RESULT (Parsed JSON being sent to UI):");
      console.log(JSON.stringify(finalJson.forecast, null, 2));
      console.log("====");
      
      return NextResponse.json(finalJson);
    } catch (e) {
      console.error("Failed to parse analysis result.");
      return NextResponse.json({ error: "Gemini AI Error: Failed to parse the forecast analysis. Please try again." }, { status: 500 });
    }
  } catch (error: any) {
    console.error("ERROR IN API ROUTE:", error);
    
    // Clean up Gemini API Errors
    if (error.message && error.message.includes('429 Too Many Requests')) {
      return NextResponse.json({ 
        error: "Gemini AI Error: Rate limit exceeded (429). You have made too many requests on the free tier. Please wait a minute and try again." 
      }, { status: 429 });
    }
    
    if (error.message && error.message.includes('GoogleGenerativeAI Error')) {
      return NextResponse.json({ 
        error: "Gemini AI Error: The AI service encountered an issue processing your request. Please try again." 
      }, { status: 500 });
    }

    return NextResponse.json({ error: error.message || "An unexpected internal server error occurred." }, { status: 500 });
  }
}
