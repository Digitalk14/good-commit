'use client';

import { useState, useEffect } from 'react';
import { getCommitLogsLocalStorage, setCommitLogsLocalStorage, CommitLog } from './utils';

export const CommitLogs = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commitLogs, setCommitLogs] = useState<CommitLog[]>([]);

  useEffect(() => {
    // Initial load
    const commitLogsLS = getCommitLogsLocalStorage();
    setCommitLogs(commitLogsLS);

    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'commitLogs') {
        const newCommitLogs = getCommitLogsLocalStorage();
        setCommitLogs(newCommitLogs);
      }
    };

    // Listen for custom event
    const handleCommitLogsUpdate = (event: CustomEvent) => {
      setCommitLogs(event.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('commitLogsUpdated', handleCommitLogsUpdate as EventListener);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('commitLogsUpdated', handleCommitLogsUpdate as EventListener);
    };
  }, []);

  const handleDeleteCommit = (id: string) => {
    const newLogs = commitLogs.filter((log: CommitLog) => log.id !== id);
    setCommitLogsLocalStorage(newLogs);
    setCommitLogs(newLogs);
  };

  const handleCopyCommit = (message: string) => {
    navigator.clipboard.writeText(message);
  };

  const isCommitLogsEmpty = commitLogs.length === 0;
  if (isCommitLogsEmpty) {
    return null;
  }
  return (
    <div 
      
      className="cursor-pointer rounded w-full max-w-[640px] relative"
    >
      <div className="flex items-center gap-2 text-sm text-[#666]" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="font-bold">{isExpanded ? 'Hide' : 'Show'} previous commits</span>
        <span>{isExpanded ? '▼' : '▲'}</span>
      </div>
      
      {isExpanded && (
        <div className="mt-3 absolute top-full left-0 w-full z-10 shadow-lg rounded-b">
          {commitLogs.map((log: CommitLog) => (
            <div key={log.id} className="p-2 block cursor-pointer text-[#666] ">
              <p>{log.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <button className="text-xs text-[#666] cursor-pointer" onClick={() => handleDeleteCommit(log.id)}>Delete</button>
                <button className="text-xs text-[#666] cursor-pointer" onClick={() => handleCopyCommit(log.message)}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
