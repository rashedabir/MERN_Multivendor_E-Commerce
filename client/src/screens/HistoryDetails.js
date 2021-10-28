import {
  Button,
  Container,
  makeStyles,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#000",
    color: "#fff",
  },
  body: {
    fontSize: 14,
    padding: "10px",
    textTransform: "uppercase",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#eee",
    },
  },
}))(TableRow);

const StyledTableCell2 = withStyles((theme) => ({
  head: {
    backgroundColor: "#000",
    color: "#fff",
  },
  body: {
    fontSize: 14,
    padding: "0px 10px",
    textTransform: "uppercase",
  },
}))(TableCell);

const StyledTableRow2 = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#eee",
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  table: {
    minWidth: 700,
  },
}));

function HistoryDetails() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isSeller] = state.userAPI.isSeller;
  const [history] = state.userAPI.history;
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState([]);
  const [checked, setChecked] = useState();
  const [_id, setId] = useState("");
  const [callback, setCallback] = state.userAPI.callback;
  const [orders, setOrders] = useState([]);
  const [user] = state.userAPI.user;

  useEffect(() => {
    if (isSeller) {
      const res = cart.filter((cart) => cart.user === user._id);
      setOrders(res);
    }
  }, [cart, isSeller, user._id]);

  useEffect(() => {
    if (id) {
      history.forEach((history) => {
        if (history._id === id) {
          setDetails(history);
          setCart(history.cart);
          setChecked(history.status);
          setId(history._id);
        }
      });
    }
  }, [id, history]);

  const updateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://shop-clue.herokuapp.com/api/order/${_id}`,
        {
          checked: checked,
        },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
      toast.success("Order Updated.");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h1"
          style={{
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textAlign: "center",
          }}
        >
          shipping address
        </Typography>
        <TableContainer component={Paper} style={{ margin: "30px 0" }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Bkash</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="right">District</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {details.bkash === "" ? "CASH ON DELIVARY" : details.bkash}
                </StyledTableCell>
                <StyledTableCell align="left">{details.phone}</StyledTableCell>
                <StyledTableCell align="left">
                  {details.address}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {details.district}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          component="h1"
          style={{
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textAlign: "center",
          }}
        >
          ordered items
        </Typography>
        {isSeller ? (
          <TableContainer component={Paper} style={{ margin: "30px 0" }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell2>Product ID</StyledTableCell2>
                  <StyledTableCell2 align="left">Title</StyledTableCell2>
                  <StyledTableCell2 align="right">Image</StyledTableCell2>
                  <StyledTableCell2 align="right">Price</StyledTableCell2>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((product, index) => (
                  <StyledTableRow2 key={index}>
                    <StyledTableCell2 component="th" scope="row">
                      {product.product_id}
                    </StyledTableCell2>
                    <StyledTableCell2 align="left">
                      {product.title}
                    </StyledTableCell2>
                    <StyledTableCell2 align="right">
                      <img
                        src={product.images.url}
                        width="50px"
                        alt={product.title}
                      />
                    </StyledTableCell2>
                    <StyledTableCell2 align="right">
                      $ {product.price}
                    </StyledTableCell2>
                  </StyledTableRow2>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper} style={{ margin: "30px 0" }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell2>Product ID</StyledTableCell2>
                  <StyledTableCell2 align="left">Title</StyledTableCell2>
                  <StyledTableCell2 align="right">Image</StyledTableCell2>
                  <StyledTableCell2 align="right">Price</StyledTableCell2>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart?.map((product, index) => (
                  <StyledTableRow2 key={index}>
                    <StyledTableCell2 component="th" scope="row">
                      {product.product_id}
                    </StyledTableCell2>
                    <StyledTableCell2 align="left">
                      {product.title}
                    </StyledTableCell2>
                    <StyledTableCell2 align="right">
                      <img
                        src={product.images.url}
                        width="50px"
                        alt={product.title}
                      />
                    </StyledTableCell2>
                    <StyledTableCell2 align="right">
                      $ {product.price}
                    </StyledTableCell2>
                  </StyledTableRow2>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {isSeller ? (
          <div>
            <div className="form-check-inline">
              <label>Status: </label>
              <div>
                <Radio
                  color="primary"
                  value={checked}
                  checked={checked === true}
                  onChange={() => {
                    setChecked(true);
                  }}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Complete
                </label>
              </div>
              <div className="form-check form-check-inline">
                <Radio
                  value={checked}
                  checked={checked === false}
                  onChange={() => {
                    setChecked(false);
                  }}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Pending
                </label>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={updateOrder}
              style={{ margin: "10px 0px" }}
              color={checked ? "primary" : "secondary"}
            >
              update
            </Button>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default HistoryDetails;
