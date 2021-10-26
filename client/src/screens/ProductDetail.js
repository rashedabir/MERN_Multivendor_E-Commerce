import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Grow,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import { GlobalState } from "../GlobalState";
import Rating from "@material-ui/lab/Rating";
import Avatar from "react-avatar";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "30px 0",
  },
  customBtn: {
    padding: "10px 40px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "white",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  posts: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "500",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  shopDetail: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  about: {
    marginBottom: "40px",
  },
  reviews: {
    textTransform: "capitalize",
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },
  multiLine: {
    width: "100%",
    margin: "10px 0",
  },
}));

function ProductDetail() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const addCart = state.userAPI.addCart;
  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [isLogged] = state.userAPI.isLogged;
  const [isSeller] = state.userAPI.isSeller;
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  const rat = ratings.map((rating) => rating.rating);
  const total = rat.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const rating = total / ratings.length;

  useEffect(() => {
    if (id) {
      products.forEach((product) => {
        if (product._id === id) {
          setDetails(product);
          setImage(product.images.url);
          setRatings(product.comments);
        }
      });
    }
  }, [id, products]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://shop-clue.herokuapp.com/api/review/${id}`,
        {
          rating: ratingValue,
          comment: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCallback(!callback);
      setRatingValue(0);
      setComment("");
      toast.success("Review Posted.");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={5} style={{ marginBottom: "30px" }}>
          <Grid item xl={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <img src={image} alt={details.title} width="100%" />
            </Paper>
          </Grid>
          <Grid item xl={6} md={6} sm={12} xs={12}>
            <div className={classes.heading}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h4"
                component="h1"
              >
                {details.title}
              </Typography>
              <Typography
                style={{ textTransform: "uppercase" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                #{details.product_id}
              </Typography>
            </div>
            <div className={classes.shopDetail}>
              <Rating
                name="half-rating-read"
                value={rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="textSecondary" component="p">
                ({ratings.length} Review)
              </Typography>
            </div>
            <Typography
              gutterBottom
              variant="body"
              component="p"
              style={{ marginBottom: "20px" }}
            >
              SOLD:{" "}
              <span style={{ color: "#f50083", fontWeight: "bold" }}>
                {details.sold}
              </span>
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h5"
              style={{ marginBottom: "20px" }}
            >
              Price:{" "}
              <span style={{ color: "#f50083", fontWeight: "bold" }}>
                ${details.price}
              </span>
            </Typography>
            <Typography
              className={classes.about}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {details.description}
            </Typography>
            {isSeller ? null : (
              <Button
                variant="contained"
                className={classes.customBtn}
                onClick={() => {
                  addCart(details);
                }}
                component={Link}
                to={isLogged ? "/cart" : "/login"}
              >
                add to cart
              </Button>
            )}
          </Grid>
        </Grid>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h1"
        >
          related products
        </Typography>
        <div style={{ margin: "30px auto" }}>
          <Grow in>
            <Grid container spacing={3} alignContent="stretch">
              {products.slice(0, 4).map((product, index) => {
                return product.category === details.category ? (
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
                ) : null;
              })}
            </Grid>
          </Grow>
        </div>
        <div className={classes.root}>
          <Typography
            className={classes.reviews}
            gutterBottom
            variant="h5"
            component="h1"
          >
            reviews
          </Typography>
          {isLogged ? (
            <form style={{ margin: "20px 0" }} onSubmit={submitReview}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "uppercase",
                  margin: "15px 0",
                }}
              >
                <span>rating : </span>
                <Rating
                  size="large"
                  name="half-rating"
                  value={ratingValue}
                  onChange={(e) => {
                    setRatingValue(e.target.value);
                  }}
                  precision={0.5}
                />
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                variant="outlined"
                className={classes.multiLine}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button type="submit" variant="contained" color="primary">
                post
              </Button>
            </form>
          ) : (
            <Typography
              gutterBottom
              variant="body"
              component="h3"
              className={classes.title}
            >
              please{" "}
              <Link to="/login" style={{ color: "navy" }}>
                login
              </Link>{" "}
              or{" "}
              <Link to="/register" style={{ color: "navy" }}>
                register
              </Link>{" "}
              to post a review
            </Typography>
          )}
        </div>
        <div className={classes.root}>
          <Typography
            className={classes.reviews}
            gutterBottom
            variant="h5"
            component="h1"
          >
            {ratings.length > 0 ? "recent posts" : null}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {ratings
                .slice(0)
                .reverse()
                .map((rating) => (
                  <Paper className={classes.posts}>
                    <div>
                      <Typography
                        gutterBottom
                        variant="body"
                        component="h3"
                        className={classes.title}
                      >
                        <Avatar
                          name={rating.author}
                          size="30"
                          round={true}
                          style={{ marginRight: "10px" }}
                        />
                        {"  "}
                        {rating.author}
                        {"  "}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ marginLeft: "45px" }}
                        >
                          {new Date(rating.createdAt).toDateString()}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                        style={{ marginLeft: "47px", marginTop: "10px" }}
                      >
                        {rating.comment}
                      </Typography>
                    </div>
                    <Rating
                      name="half-rating-read"
                      value={rating.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Paper>
                ))}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default ProductDetail;
