import { Container, Grid, Grow, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  paper: {
    padding: "0px 10px",
    paddingBottom: "30px",
  },
}));

function ShopDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      if (id) {
        setLoading(true);
        const res = await axios.get(
          `https://shop-clue.herokuapp.com/api/shops/${id}`
        );
        setProducts(res.data.products);
        setLoading(false);
      }
    };
    getProducts();
  }, [id]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.paper}>
          <Grow in>
            <Grid container spacing={3} alignContent="stretch">
              {products
                .slice(0)
                .reverse()
                .map((product, index) => (
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
      </Container>
    </div>
  );
}

export default ShopDetail;
