"use client";

import React, { useState } from "react";
import { CopyPasteIcon } from "./copy-paste-icon";
export const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [commit, setCommit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        setCommit(text.trim());
    } catch (e) {
      console.error(e);
      setCommit("Ooops something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[640px]">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search"
          className="search-input dark:bg-gray-950 dark:text-[#ededed]"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {commit && (
        <div className="commit-container w-full mt-6">
          <h2 className="font-semibold mb-2 dark:text-[#ededed]">Commit:</h2>
          <div className="flex gap-2">
            <code className="bg-gray-100 p-2 block rounded w-full">{commit}</code>
            <button className="bg-gray-100 p-2 block rounded cursor-pointer" onClick={() => navigator.clipboard.writeText(commit)}>
              <CopyPasteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
