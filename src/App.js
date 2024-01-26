import React, { useState } from "react";
import axios from "axios";

const GitHubActionTrigger = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerWorkflowWithoutInput = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.github.com/repos/meet96/Github-Actions/actions/workflows/github-action-branch.yml/dispatches",
        {
          ref: "main",
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
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

  const triggerWorkflowWithInput = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.github.com/repos/meet96/Github-Actions/actions/workflows/github-action-input.yml/dispatches",
        {
          ref: "main",
          inputs: {
            myInput: inputValue, // Pass the input value to the workflow
          },
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ color: "#333" }}>GitHub Workflow Trigger</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ margin: "20px 0", padding: "10px", width: "200px" }}
      />
      <button
        onClick={triggerWorkflowWithoutInput}
        disabled={loading}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Trigger Workflow Without Input"}
      </button>
      <button
        onClick={triggerWorkflowWithInput}
        disabled={loading}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Trigger Workflow With Input"}
      </button>
      {message && <p style={{ color: "#333" }}>{message}</p>}
    </div>
  );
};

export default GitHubActionTrigger;
