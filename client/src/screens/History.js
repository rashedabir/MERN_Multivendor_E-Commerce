import React, { useContext } from "react";
import {
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  table: {
    minWidth: 700,
  },
}));

function History() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [isSeller] = state.userAPI.isSeller;
  const [history] = state.userAPI.history;

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
          {isSeller ? "orders" : "history"}
        </Typography>
        <TableContainer component={Paper} style={{ margin: "30px 0" }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell align="left">Full Name</StyledTableCell>
                <StyledTableCell align="left">Payment</StyledTableCell>
                <StyledTableCell align="right">Order Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history
                ?.slice(0)
                .reverse()
                .map((history, index) => (
                  <StyledTableRow
                    key={index}
                    component={Link}
                    to={`/history_details/${history._id}`}
                  >
                    <StyledTableCell component="th" scope="row">
                      {history.status ? "Complete" : "pending"}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {history._id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {history.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {history.trxid === ""
                        ? "CASH ON DELIVARY"
                        : history.trxid}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(history.createdAt).toDateString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default History;
