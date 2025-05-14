export const getCommitLogsLocalStorage = () => {
  const commitLogs = localStorage.getItem("commitLogs");
  return commitLogs ? JSON.parse(commitLogs) : [];
};

export interface CommitLog {
    id: string;
    message: string;
  }

export const setCommitLogsLocalStorage = (commitLogs: CommitLog[]) => {
  localStorage.setItem("commitLogs", JSON.stringify(commitLogs));
};


