import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    margin: "30px 0",
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography>Not Found</Typography>
      </Container>
    </div>
  );
}

export default NotFound;
