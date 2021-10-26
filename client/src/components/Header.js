import {
  makeStyles,
  alpha,
  MenuItem,
  IconButton,
  Badge,
  Menu,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CategoryIcon from "@material-ui/icons/Category";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [isSeller, setIsSeller] = state.userAPI.isSeller;
  const [cart] = state.userAPI.cart;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = async () => {
    await axios.get("https://shop-clue.herokuapp.com/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsSeller(false);
    setIsLogged(false);
    handleMenuClose();
    window.location.href = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/shop">
        <IconButton aria-label="show 4 new mails" color="inherit">
          <StorefrontIcon />
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      {isLogged ? (
        <MenuItem component={Link} to="/history">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <HistoryIcon />
          </IconButton>
          <p>{isSeller ? "Order" : "History"}</p>
        </MenuItem>
      ) : null}
      {isAdmin ? (
        <MenuItem component={Link} to="/categories">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <CategoryIcon />
          </IconButton>
          <p>Categories</p>
        </MenuItem>
      ) : null}
      {isSeller ? (
        <MenuItem component={Link} to="/create_product">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <AddBoxIcon />
          </IconButton>
          <p>Create Product</p>
        </MenuItem>
      ) : null}
      {isSeller ? (
        <MenuItem component={Link} to="/seller_product">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <ListAltIcon />
          </IconButton>
          <p>Products</p>
        </MenuItem>
      ) : null}
      {isSeller ? null : (
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      )}
      {isLogged ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem component={Link} to="/login">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <VpnKeyIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default" style={{ padding: "0 10px" }}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            variant="h6"
            noWrap
          >
            <img
              src={logo}
              alt="logo"
              width="150px"
              style={{ marginTop: "10px" }}
            />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isSeller || isAdmin ? null : (
              <Button component={Link} to="/shop" size="medium">
                shop
              </Button>
            )}
            {isAdmin ? (
              <Button component={Link} to="/categories" size="medium">
                categories
              </Button>
            ) : null}
            {isLogged ? (
              <Button component={Link} to="/history" size="medium">
                {isSeller ? "orders" : "history"}
              </Button>
            ) : null}
            {isSeller ? (
              <Button component={Link} to="/create_product" size="medium">
                create product
              </Button>
            ) : null}
            {isSeller ? (
              <Button component={Link} to="/seller_product" size="medium">
                products
              </Button>
            ) : null}
            {isLogged ? null : (
              <Button component={Link} to="/login" size="medium">
                login <AcUnitIcon style={{ margin: "0 5px" }} /> registration
              </Button>
            )}
            {isSeller ? null : (
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                component={Link}
                to={isLogged ? "/cart" : "/login"}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {isLogged ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : null}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default Header;
