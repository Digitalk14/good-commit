export const getCommitMessage = async (inputValue: string) => {
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You're a developer's assistant. Your task is to generate git commit messages according to the Conventional Commits standard.
                Use one of the types: feat, fix, docs, style, refactor, test, chore.
                Add the scope in parentheses if it is obvious (for example: auth, login, cart).
                Write commit in English.`,
              },
              {
                role: "user",
                content: `I did: ${inputValue}`,
              },
            ],
            temperature: 0.3,
          }),
        });
  
        const response = await res.json();
        const text = response.choices[0].message.content;
        return text.trim();
      } catch (error) {
        console.error(error);
        return "Ooops something went wrong";
      }
};
