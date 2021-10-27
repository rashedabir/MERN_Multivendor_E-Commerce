import {
  Button,
  Container,
  FormControl,
  makeStyles,
  MenuItem,
  Paper,
  Select,
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

  useEffect(() => {
    if (id) {
      history.forEach((history) => {
        if (history._id === id) {
          setDetails(history);
          setCart(history.cart);
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
        <TableContainer component={Paper} style={{ margin: "30px 0" }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {isSeller ? <StyledTableCell2>Action</StyledTableCell2> : null}
                <StyledTableCell2>Product ID</StyledTableCell2>
                <StyledTableCell2>Status</StyledTableCell2>
                <StyledTableCell2 align="left">Title</StyledTableCell2>
                <StyledTableCell2 align="right">Image</StyledTableCell2>
                <StyledTableCell2 align="right">Price</StyledTableCell2>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart?.map((product, index) => (
                <StyledTableRow2 key={index}>
                  {isSeller ? (
                    <StyledTableCell2 component="th" scope="row">
                      <FormControl>
                        <Select
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => {
                            setChecked(e.target.value);
                            setId(product._id);
                          }}
                          value={checked}
                        >
                          <MenuItem value={true}>Complete</MenuItem>
                          <MenuItem value={false}>Pending</MenuItem>
                        </Select>
                      </FormControl>
                    </StyledTableCell2>
                  ) : null}
                  <StyledTableCell2 component="th" scope="row">
                    {product.product_id}
                  </StyledTableCell2>
                  <StyledTableCell2 component="th" scope="row">
                    {product.checked === false ? "Pending" : "Complete"}
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
        {isSeller ? (
          <Button variant="outlined" onClick={updateOrder}>
            update
          </Button>
        ) : null}
      </Container>
    </div>
  );
}

export default HistoryDetails;
