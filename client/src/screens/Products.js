import React, { useContext } from "react";
import { Container, Grid, Grow, makeStyles } from "@material-ui/core";
import Filters from "../components/Filters";
import { GlobalState } from "../GlobalState";
import ProductCard from "../components/ProductCard";
import Loading from "./Loading";
import LoadMore from "../components/LoadMore";
import AddsShow from "../components/AddsShow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "0px 10px",
    paddingBottom: "30px",
  },
}));

function Products() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [loading] = state.productsAPI.loading;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Filters />
        <AddsShow />
        <div className={classes.paper}>
          <Grow in>
            <Grid container spacing={3} alignContent="stretch">
              {products.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  style={{ display: "flex" }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grow>
          {products.length === 0 && <Loading loading={loading} />}
        </div>
        <LoadMore />
      </Container>
    </div>
  );
}

export default Products;
