import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  directory: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "5px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginLeft: theme.spacing(2),
  },
}));

function GitHubAction() {
  const classes = useStyles();

  const [workflows, setWorkflows] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const response = await axios.get(
        "https://api.github.com/repos/meet96/Github-Actions/actions/workflows",
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      setWorkflows(response.data.workflows);
    };

    fetchWorkflows();
  }, []);

  const triggerWorkflow = async (workflow) => {
    setLoading(true);
    let data = {
      ref: "main",
    };

    if (inputValue) {
      data.inputs = {
        myInput: inputValue, // Pass the input value to the workflow
      };
    }
    try {
      const response = await axios.post(
        `https://api.github.com/repos/meet96/Github-Actions/actions/workflows/${workflow.id}/dispatches`,
        data,
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
      setInputValue(""); // Clear the input box
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
        />
      </form>
      <List>
        <ListItem className={classes.directory}>
          <Typography variant="h6">Directory Name</Typography>
        </ListItem>
        {workflows.map((workflow) => (
          <ListItem
            button
            key={workflow.id}
            onClick={() => triggerWorkflow(workflow)}
            className={classes.listItem}
          >
            <ListItemText primary={workflow.name} />
          </ListItem>
        ))}
      </List>
      {message && <p>{message}</p>}
      {loading && <CircularProgress />}
    </Box>
  );
}

export default GitHubAction;
