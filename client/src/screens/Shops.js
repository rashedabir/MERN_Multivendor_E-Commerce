import { Container, Grid, Grow, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import AddsShow from "../components/AddsShow";
import ShopCard from "../components/ShopCard";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
}));

function Shops() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [shops] = state.shopsAPI.shops;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <AddsShow />
        <Grow in>
          <Grid container spacing={3} alignContent="stretch">
            {shops.map((shop, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                style={{ display: "flex" }}
              >
                <ShopCard shop={shop} key={index} />
              </Grid>
            ))}
          </Grid>
        </Grow>
      </Container>
    </div>
  );
}

export default Shops;
