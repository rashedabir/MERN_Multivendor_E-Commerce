import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    textTransform: "capitalize",
    position: "relative",
    marginBottom: "15px",
  },
  media: {
    height: 140,
    width: "180px",
    objectFit: "cover",
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

function CartCard({ product, decrement, increament, removeCart }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.images.url}
        title={product.title}
        component={Link}
        to={`/product_detail/${product._id}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="error" component="p">
          $ {product.price}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              decrement(product._id);
            }}
          >
            <RemoveIcon />
          </IconButton>
          <p style={{ margin: "0 20px" }}>{product.quantity}</p>
          <IconButton
            onClick={() => {
              increament(product._id);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
      <IconButton
        className={classes.deleteIcon}
        onClick={() => {
          removeCart(product._id);
        }}
      >
        <CancelIcon />
      </IconButton>
    </Card>
  );
}

export default CartCard;
