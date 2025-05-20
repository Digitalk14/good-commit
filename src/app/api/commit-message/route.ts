import { NextResponse } from 'next/server';

const OPENAI_ROLE = `You're a developer's assistant. 
Your task is to generate git commit messages according to the Conventional Commits standard.
Use one of the types: feat, fix, docs, style, refactor, test, chore. 
Add the scope in parentheses if it is obvious (for example: auth, login, cart). 
Write commit in English, Limit the message to 100 characters. 
Instead of using double quotes, use single quotes.
If the message is not valid, add to the response "Failed to generate commit message"
`;

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: OPENAI_ROLE,
          },
          {
            role: "user",
            content: `I did: ${input}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const response = await res.json();
    const message = response.choices[0].message.content;

    if (message.includes("Failed to generate commit message")) {
      return NextResponse.json(
        { success: false, message: "Failed to generate commit message" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to generate commit message" },
      { status: 500 }
    );
  }
}