"use client";

import React, { useState } from "react";
import { CopyPasteIcon } from "./copy-paste-icon";
import { getCommitMessage } from "./utils";
import { setCommitLogsLocalStorage, getCommitLogsLocalStorage } from "../commit-logs/utils";
import { Toast } from "../toast/toast";

const MAX_CHARACTERS = 200;
const MIN_CHARACTERS = 5;

export const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [commit, setCommit] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const charactersLeft = MAX_CHARACTERS - inputValue.length;
  const isValid = inputValue.length >= MIN_CHARACTERS;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setInputValue(value);
    }
  };

  const handleCommitsLog = (newCommit: string ) => {
    const newLogs = [...getCommitLogsLocalStorage(), { id: Date.now(), message: newCommit }];
    setCommitLogsLocalStorage(newLogs);
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('commitLogsUpdated', { detail: newLogs }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newCommit = await getCommitMessage(inputValue);
    if (newCommit.status === "success") {
      setCommit(newCommit.message);
      handleCommitsLog(newCommit.message);
    } else {
      setCommit(newCommit.message);
    }
    setLoading(false);
    setInputValue("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commit);
    setShowToast(true);
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
        <button 
          disabled={!isValid} 
          type="submit" 
          className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#333] text-white rounded-full cursor-pointer text-base transition-all hover:bg-[#222] disabled:opacity-50 dark:bg-[#666] dark:text-[#ededed] dark:hover:bg-[#555]"
        >
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
              className="bg-gray-100 p-2 block rounded cursor-pointer h-[40px]"
              onClick={handleCopy}
            >
              <CopyPasteIcon />
            </button>
          </div>
        </div>
      )}
      <Toast 
        message="Copied to clipboard!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};
