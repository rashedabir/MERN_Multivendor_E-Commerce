import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const useStyles = makeStyles({
  root: {
    width: 345,
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
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png"
          alt=""
          className={classes.media}
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
