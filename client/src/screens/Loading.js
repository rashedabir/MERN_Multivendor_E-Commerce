import React from "react";
import { Grid, Grow } from "@material-ui/core";
import LoadingCard from "../components/LoadingCard";

function Loading({ loading }) {
  return (
    <Grow in>
      <Grid container spacing={3} alignContent="stretch">
        {["1", "2", "3", "4", "5", "6", "7", "8"].map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            style={{ display: "flex" }}
          >
            <LoadingCard loading={loading} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default Loading;
