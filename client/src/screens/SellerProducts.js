import {
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { toast } from "react-toastify";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#000",
    color: "#fff",
  },
  body: {
    fontSize: 14,
    padding: "0 10px",
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
    margin: "30px 0",
  },
  table: {
    minWidth: 700,
  },
  inputFeild: {
    width: "100%",
  },
}));

function SellerProducts() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [sellerCallback, setSellerCallback] =
    state.sellerProducts.sellerCallback;
  const [callback, setCallback] = state.productsAPI.callback;
  const [products] = state.sellerProducts.sellerProducts;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const deleteProduct = async (id, public_id) => {
    try {
      if (window.confirm("Want to delete this product?")) {
        setLoading(true);
        const deleteImg = axios.post(
          "https://shop-clue.herokuapp.com/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteProduct = axios.delete(
          `https://shop-clue.herokuapp.com/api/product/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        await deleteImg;
        await deleteProduct;
        setCallback(!callback);
        setSellerCallback(!sellerCallback);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  if (loading) {
    return <h6>Loading...</h6>;
  }

  const handleSearch = products.filter((product) => {
    return (
      product.product_id.toLowerCase().includes(search.toLowerCase()) ||
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <TextField
          id="outlined-basic"
          variant="outlined"
          className={classes.inputFeild}
          placeholder="Search Product"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <TableContainer component={Paper} style={{ margin: "30px 0" }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product ID</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch.length
                ? handleSearch.map((product, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {product.product_id}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        component={Link}
                        to={`/seller_product_detail/${product._id}`}
                      >
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <img
                          src={product.images.url}
                          width="50px"
                          alt={product.title}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        $ {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          component={Link}
                          to={`/edit_product/${product._id}`}
                        >
                          <EditIcon />
                        </IconButton>{" "}
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            deleteProduct(
                              product._id,
                              product.images.public_id
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default SellerProducts;
