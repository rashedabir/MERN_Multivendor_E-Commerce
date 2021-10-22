import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 320,
  },
  about: {
    maxHeight: 50,
    overflow: "hidden",
  },
  title: {
    textTransform: "capitalize",
  },
  buttonGroup: {
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    padding: "5px 0",
  },
});

function ProductCard({ product }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product_detail/${product._id}`}>
        <CardMedia
          className={classes.media}
          image={product.images.url}
          title={product.title}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.title}
          </Typography>
          <Typography
            className={classes.about}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonGroup}>
        <Button variant="contained" className={classes.button}>
          Buy
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={`/product_detail/${product._id}`}
          className={classes.button}
          style={{ background: "linear-gradient(to right, #00c6ff, #0072ff)" }}
        >
          view
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
