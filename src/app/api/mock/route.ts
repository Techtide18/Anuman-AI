import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    let prompt = '';
    
    if (data.vertical === 'cheque_bounce') {
      prompt = `
      Generate realistic mock data for a Cheque Bounce (Section 138) case in Delhi.
      Output ONLY a valid JSON object matching this exact schema:
      {
        "description": "A detailed 3-4 sentence description of how the cheque bounce happened. Include details like the specific business transaction, the amount, the date, and what the accused is claiming."
      }
      `;
    } else if (data.vertical === 'commercial') {
      prompt = `
      Generate realistic mock data for a Commercial Dispute (Section 12A Commercial Courts Act) case in Delhi.
      Output ONLY a valid JSON object matching this exact schema:
      {
        "description": "A detailed 3-4 sentence description of a business dispute (e.g. unpaid invoices, breach of service, construction delay). Include specific details about the industry, the contract failure, and the financial damages."
      }
      `;
    } else if (data.vertical === 'family') {
      prompt = `
      Generate realistic mock data for a Family Law (Financial Settlement / Maintenance) case in Delhi.
      Output ONLY a valid JSON object matching this exact schema:
      {
        "description": "A detailed 3-4 sentence description of the matrimonial dispute. Include specific details about the marriage duration, grounds for divorce/separation, and why maintenance is being claimed."
      }
      `;
    } else {
      return NextResponse.json({ error: "Invalid vertical" }, { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return NextResponse.json(JSON.parse(cleanedText));
  } catch (error) {
    console.error("Mock data error:", error);
    return NextResponse.json({ error: "Failed to generate mock data" }, { status: 500 });
  }
}
