import React, { useState } from "react";
import axios from "axios";

const GitHubActionTrigger = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const triggerWorkflow = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://api.github.com/repos/meet96/Github-Actions/actions/workflows/github-action-branch.yml/dispatches",
        {
          ref: "main",
        },
        {
          headers: {
            Authorization: `token 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`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      setMessage("Workflow triggered successfully");
    } catch (error) {
      setMessage("Failed to trigger workflow");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={triggerWorkflow} disabled={loading}>
        {loading ? "Loading..." : "Trigger GitHub Workflow"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GitHubActionTrigger;
