"use client";

import React, { useState } from "react";
import { CopyPasteIcon } from "./copy-paste-icon";
import { getCommitMessage } from "./utils";

const MAX_CHARACTERS = 200;
const MIN_CHARACTERS = 5;

export const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [commit, setCommit] = useState("");
  const [loading, setLoading] = useState(false);
  const charactersLeft = MAX_CHARACTERS - inputValue.length;
  const isValid = inputValue.length >= MIN_CHARACTERS;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setInputValue(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const commit = await getCommitMessage(inputValue);
    setCommit(commit);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[640px] relative">
      <form
        onSubmit={handleSubmit}
        className={`search-container ${loading ? "loading" : ""}`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleValueChange}
          placeholder="What did you code?"
          className="search-input dark:bg-gray-950 dark:text-[#ededed]"
        />
        <button disabled={!isValid} type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="characters-left">
        <p>{charactersLeft} characters left</p>
      </div>
      {loading && (
        <div className="loading-container">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}
      {commit && (
        <div className="commit-container w-full mt-6">
          <h2 className="font-semibold mb-2 dark:text-[#ededed]">Commit:</h2>
          <div className="flex gap-2">
            <code className="bg-gray-100 p-2 block rounded w-full">
              {commit}
            </code>
            <button
              className="bg-gray-100 p-2 block rounded cursor-pointer h-[36px]"
              onClick={() => navigator.clipboard.writeText(commit)}
            >
              <CopyPasteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
