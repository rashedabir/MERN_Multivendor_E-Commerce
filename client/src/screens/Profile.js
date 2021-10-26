import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
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
}));

function Profile() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [id, setId] = useState("");
  const [callback, setCallback] = state.userAPI.callback;

  useEffect(() => {
    if (user._id) {
      setId(user._id);
      setFullName(user.fullName);
      setUserName(user.userName);
      setShopName(user.shopName);
      setImage(user.images);
    } else {
      setFullName("");
      setUserName("");
      setShopName("");
      setImage(false);
    }
  }, [user]);

  const styleUpload = {
    display: image ? "block" : "none",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post(
        "https://shop-clue.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://shop-clue.herokuapp.com/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://shop-clue.herokuapp.com/user/user_info/${id}`,
        {
          fullName: fullName,
          password: password,
          rePassword: rePassword,
          images: image,
          shopName: shopName,
        },
        { headers: { Authorization: token } }
      );
      setCallback(!callback);
      toast.success("Profile Updated");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xl={5} lg={5} md={5} xs={12}>
            <div className="upload">
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
              />
              {loading ? (
                "Uploading..."
              ) : (
                <Paper
                  className={classes.paper}
                  id="file_img"
                  style={styleUpload}
                >
                  <img src={image ? image.url : ""} alt="" />
                  <span onClick={handleDestroy}>X</span>
                </Paper>
              )}
            </div>
          </Grid>
          <Grid item xl={7} lg={7} md={7} xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                component="h4"
                style={{
                  padding: "15px 0",
                  borderBottom: "2px solid #eee",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px ",
                  marginBottom: "15px",
                }}
              >
                update profile
              </Typography>
              <TextField
                style={{ marginTop: "20px" }}
                id="outlined-basic"
                label="Full Name"
                type="text"
                variant="outlined"
                className={classes.inputFeild}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
              />
              <TextField
                id="outlined-basic"
                label="User Name"
                type="text"
                variant="outlined"
                disabled
                className={classes.inputFeild}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
              <TextField
                id="outlined-basic"
                label="New Password"
                type="password"
                variant="outlined"
                className={classes.inputFeild}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
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
                value={rePassword}
              />
              {user.role === "seller" ? (
                <TextField
                  id="outlined-basic"
                  label="Shop Name"
                  type="text"
                  variant="outlined"
                  className={classes.inputFeild}
                  onChange={(e) => {
                    setShopName(e.target.value);
                  }}
                  value={shopName}
                />
              ) : null}
              <Button onClick={handleSubmit} className={classes.button}>
                update
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
