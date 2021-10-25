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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 300,
  },
  about: {
    maxHeight: 55,
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
  shopDetail: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
});

function ProductCard({ product }) {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  const ratings = product.comments.map((rating) => rating.rating);
  const total = ratings.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const rating = total / ratings.length;

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
          <div className={classes.shopDetail}>
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="textSecondary" component="p">
              ({product.comments.length} Review)
            </Typography>
          </div>
          <Typography
            variant="body"
            color="secondary"
            component="h4"
            style={{ marginBottom: "5px" }}
          >
            $ {product.price}
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
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            addCart(product);
          }}
        >
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
