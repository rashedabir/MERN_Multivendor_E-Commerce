import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 300,
    width: "100%",
  },
  title: {
    textTransform: "capitalize",
    marginLeft: "10px",
    marginTop: "7px",
  },
});

function ShopCard({ shop }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/shop_detail/${shop._id}`}>
        <CardMedia
          className={classes.media}
          image={
            shop.images
              ? shop.images.url
              : "https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_960_720.png"
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar name={shop.shopName} round={true} size={40} />{" "}
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {shop.shopName}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ShopCard;
