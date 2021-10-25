import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  paper: {
    maxWidth: "400px",
    margin: "30px auto",
    textAlign: "center",
    justifyContent: "center",
    padding: "20px",
  },
  heading: {
    fontWeight: "600",
    padding: "25px 0",
    paddingBottom: "40px",
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
    padding: "30px 0",
    fontSize: "18px",
  },
}));

function Registration() {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://shop-clue.herokuapp.com/user/register", {
        fullName: fullName,
        userName: userName,
        password: password,
        rePassword: rePassword,
        role: role,
        shopName: shopName,
      });
      window.location.href = "/";
      toast.success("Register Success.");
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
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                className={classes.inputFeild}
                autoFocus
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                className={classes.inputFeild}
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
              <TextField
                id="outlined-basic"
                label="Repeat Password"
                type="password"
                variant="outlined"
                className={classes.inputFeild}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
              />
              <FormControl
                component="fieldset"
                style={{ marginBottom: "10px" }}
              >
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio color="primary" />}
                    label="User"
                  />
                  <FormControlLabel
                    value="seller"
                    control={<Radio />}
                    label="Seller"
                  />
                </RadioGroup>
              </FormControl>
              {role === "seller" ? (
                <TextField
                  id="outlined-basic"
                  label="Shop Name"
                  variant="outlined"
                  className={classes.inputFeild}
                  autoFocus
                  required
                  onChange={(e) => {
                    setShopName(e.target.value);
                  }}
                />
              ) : null}
              <Button type="submit" className={classes.button}>
                sign up
              </Button>
            </form>
            <Typography variant="h6" className={classes.info}>
              Already have an account? <Link to="/login">Sign in</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Registration;
