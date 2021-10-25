import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartCard from "../components/CartCard";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 0",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  card: {
    width: "100%",
    padding: theme.spacing(2),
  },
  subTotal: {
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  button: {
    width: "100%",
    marginBottom: "13px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    padding: "10px 0",
  },
}));

function Cart() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState("0");

  const fetchCart = async (cart) => {
    await axios.patch(
      "https://shop-clue.herokuapp.com/user/addcart",
      { cart: cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increament = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    fetchCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    fetchCart(cart);
  };

  const removeCart = (id) => {
    if (window.confirm("Do you want to Delete this cart?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      fetchCart(cart);
      toast.info("Cart Deleted");
    }
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  if (cart.length === 0) {
    return (
      <Container
        maxWidth="lg"
        style={{ textAlign: "center", margin: "15px auto" }}
      >
        <Typography variant="h4">Cart is Empty</Typography>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
          alt=""
          width="80%"
        />
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" style={{ display: "flex" }}>
        <Grid container spacing={3}>
          <Grid item xl={8} lg={8} md={8} xs={12} className={classes.paper}>
            {cart.map((cart) => (
              <CartCard
                increament={increament}
                decrement={decrement}
                product={cart}
                removeCart={removeCart}
              />
            ))}
          </Grid>
          <Grid item xl={4} lg={4} md={4} xs={12}>
            <Card className={classes.card}>
              <Typography variant="h5" className={classes.subTotal}>
                Subtotal
              </Typography>
              <div
                style={{ borderBottom: "2px solid #eee", padding: "10px 0" }}
              >
                {cart.length &&
                  cart.map((cart) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                      }}
                    >
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ textTransform: "capitalize" }}
                      >
                        {cart.title} x{cart.quantity}
                      </Typography>{" "}
                      <Typography variant="p" color="error">
                        $ {cart.price * cart.quantity}
                      </Typography>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px 0",
                }}
              >
                <Typography variant="h4" component="h6">
                  Total
                </Typography>
                <Typography variant="h4" component="h6" color="error">
                  ${total}
                </Typography>
              </div>
              <Button component={Link} to="/order" className={classes.button}>
                proceed to pay
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Cart;
