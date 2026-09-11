import re

with open('src/app/api/forecast/route.ts', 'r') as f:
    content = f.read()

bad_block = """      const queryPrompt = `
      You are an expert Indian lawyer. 
      Convert the following case facts into a highly optimized search query for the Indian Kanoon search API.
      
      ${attempt > 1 ? `CRITICAL: Your previous query (${previousQuery}) returned 0 results! You MUST trim it down. Remove some specific ANDD keywords or replace them with ORR. Make it significantly broader. Keep it to a maximum of 2 or 3 ANDD blocks.` : ''}
      
      CRITICAL INSTRUCTIONS FOR KANOON API:
      1. Use Boolean operators ANDD, ORR. (e.g. "Section 138" ANDD "dishonour" ORR "bounce").
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. DO NOT over-restrict the search using too many ANDD clauses for specific facts. Use broad synonyms!
      `;

      let verticalDetails = '';
      if (data.vertical === 'cheque_bounce') {
        verticalDetails = `
        Cheque Amount: ₹${data.chequeAmount}
        Reason for Dishonour: ${data.dishonourReason}
        Notice Served: ${data.noticeServed ? 'Yes' : 'No'}
        Defence Raised: ${data.defenceRaised ? data.defenceRaised.join(', ') : 'None'}`;
      } else if (data.vertical === 'commercial') {
        verticalDetails = `
        Claim Amount: ₹${data.claimAmount}
        Contract Type: ${data.contractType}
        Written Contract: ${data.writtenContract ? 'Yes' : 'No'}
        Mediation Attempted: ${data.mediationAttempted ? 'Yes' : 'No'}
        Counterclaim Expected: ${data.counterclaimExpected ? 'Yes' : 'No'}
        Nature of Dispute: ${data.natureOfDispute ? data.natureOfDispute.join(', ') : 'None'}`;
      } else if (data.vertical === 'family') {
        verticalDetails = `
        Petitioner Income: ₹${data.petitionerIncome}
        Respondent Income: ₹${data.respondentIncome}
        Years of Marriage: ${data.yearsOfMarriage}
        Number of Children: ${data.numChildren}
        Type of Proceeding: ${data.typeOfProceeding}
        Nature of Relief Sought: ${data.natureOfRelief ? data.natureOfRelief.join(', ') : 'None'}`;
      }

      const queryPrompt = `
      You are an expert Indian Legal AI. Based on the following case details, generate the perfect boolean search string for the Indian Kanoon API.
      
      RULES:
      1. Use Boolean operators ANDD, ORR. (e.g. "Section 138" ANDD "dishonour" ORR "bounce").
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. DO NOT over-restrict the search using too many ANDD clauses for specific facts. Use broad synonyms!
      
      Case Category: ${data.vertical}
      State: ${data.stateUT}
      Court Level: ${data.courtLevel}
      ${verticalDetails}
      
      Output a valid JSON object with exactly two keys:
      {
        "query": "The boolean search string for Indian Kanoon without any parentheses",
        "keywordReasoning": "Why you chose these keywords"
      }
      `;"""

good_block = """      let verticalDetails = '';
      if (data.vertical === 'cheque_bounce') {
        verticalDetails = `
        Cheque Amount: ₹${data.chequeAmount}
        Reason for Dishonour: ${data.dishonourReason}
        Notice Served: ${data.noticeServed ? 'Yes' : 'No'}
        Defence Raised: ${data.defenceRaised ? data.defenceRaised.join(', ') : 'None'}`;
      } else if (data.vertical === 'commercial') {
        verticalDetails = `
        Claim Amount: ₹${data.claimAmount}
        Contract Type: ${data.contractType}
        Written Contract: ${data.writtenContract ? 'Yes' : 'No'}
        Mediation Attempted: ${data.mediationAttempted ? 'Yes' : 'No'}
        Counterclaim Expected: ${data.counterclaimExpected ? 'Yes' : 'No'}
        Nature of Dispute: ${data.natureOfDispute ? data.natureOfDispute.join(', ') : 'None'}`;
      } else if (data.vertical === 'family') {
        verticalDetails = `
        Petitioner Income: ₹${data.petitionerIncome}
        Respondent Income: ₹${data.respondentIncome}
        Years of Marriage: ${data.yearsOfMarriage}
        Number of Children: ${data.numChildren}
        Type of Proceeding: ${data.typeOfProceeding}
        Nature of Relief Sought: ${data.natureOfRelief ? data.natureOfRelief.join(', ') : 'None'}`;
      }

      const queryPrompt = `
      You are an expert Indian Legal AI. Based on the following case details, generate the perfect boolean search string for the Indian Kanoon API.
      
      ${attempt > 1 ? `CRITICAL: Your previous query (${previousQuery}) returned 0 results! You MUST trim it down. Remove some specific ANDD keywords or replace them with ORR. Make it significantly broader. Keep it to a maximum of 2 or 3 ANDD blocks.` : ''}

      RULES:
      1. Use Boolean operators ANDD, ORR. (e.g. "Section 138" ANDD "dishonour" ORR "bounce").
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. DO NOT over-restrict the search using too many ANDD clauses for specific facts. Use broad synonyms!
      
      Case Category: ${data.vertical}
      State: ${data.stateUT}
      Court Level: ${data.courtLevel}
      ${verticalDetails}
      
      Output a valid JSON object with exactly two keys:
      {
        "query": "The boolean search string for Indian Kanoon without any parentheses",
        "keywordReasoning": "Why you chose these keywords"
      }
      `;"""

content = content.replace(bad_block, good_block)

with open('src/app/api/forecast/route.ts', 'w') as f:
    f.write(content)
