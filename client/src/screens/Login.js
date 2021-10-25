import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  paper: {
    maxWidth: "400px",
    margin: "60px auto",
    textAlign: "center",
    justifyContent: "center",
    padding: "20px",
  },
  heading: {
    fontWeight: "600",
    padding: "25px 0",
    paddingBottom: "60px",
  },
  inputFeild: {
    width: "100%",
    marginBottom: "13px",
  },
  button: {
    width: "100%",
    marginBottom: "13px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    padding: "10px 0",
  },
  info: {
    padding: "50px 0",
    fontSize: "18px",
  },
}));

function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://shop-clue.herokuapp.com/user/login", {
        userName: userName,
        password: password,
      });
      toast.success("Wellcome.");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={0} direction="column" justifyContent="center">
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                className={classes.inputFeild}
                autoFocus
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                className={classes.inputFeild}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button type="submit" className={classes.button}>
                sign in
              </Button>
            </form>
            <Typography variant="h6" className={classes.info}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
