import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Rate limiting configuration
const RATE_LIMIT = 5; // Number of requests per minute
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number }>();

const refillTokens = (ip: string) => {
  const currentTime = Date.now();
  const rateLimitInfo = rateLimitMap.get(ip);

  if (rateLimitInfo) {
    const elapsedTime = currentTime - rateLimitInfo.lastRefill;
    const tokensToAdd = Math.floor(elapsedTime / 60000) * RATE_LIMIT;
    rateLimitInfo.tokens = Math.min(
      RATE_LIMIT,
      rateLimitInfo.tokens + tokensToAdd
    );
    rateLimitInfo.lastRefill = currentTime;
  } else {
    rateLimitMap.set(ip, { tokens: RATE_LIMIT, lastRefill: currentTime });
  }
};

const isRateLimited = (ip: string) => {
  refillTokens(ip);
  const rateLimitInfo = rateLimitMap.get(ip);

  if (rateLimitInfo && rateLimitInfo.tokens > 0) {
    rateLimitInfo.tokens -= 1;
    return false;
  }

  return true;
};

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("remote-addr") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { name, email, experience, jobDescription, role, language } =
    await request.json();

  if (!name || !email || !experience || !jobDescription || !role || !language) {
    return NextResponse.json(
      { error: "Please provide all the required fields" },
      { status: 400 }
    );
  }

  const prompt = `
    Generate interview questions for a candidate with the following details:
    Name: ${name}
    Email: ${email}
    Years of Experience: ${experience}
    Job Description: ${jobDescription}
    Role: ${role}
    Programming Languages: ${language}
    Minimum 5 questions and increase the difficulty level based on the experience and role of the candidate.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant." },
        { role: "user", content: prompt },
      ],
    });
    console.log(response);

    if(!response.choices[0].message.content)
      return NextResponse.json(
        { error: "Failed to generate interview questions. Please try again." },
        { status: 500 }
      );

    return NextResponse.json(
      {
        data: response.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
