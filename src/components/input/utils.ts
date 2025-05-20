
export const getCommitMessage = async (inputValue: string) => {
  try {
    const res = await fetch("/api/commit-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputValue }),
    });

    const response = await res.json();
    
    if (!response.success) {
      return {
        status: "error",
        message: "Failed to generate commit message",
      };
    }

    return {
      status: "success",
      message: response.message.trim(),
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to generate commit message",
    };
  }
};
