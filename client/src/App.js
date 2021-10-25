import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { GlobalState } from "./GlobalState";
import Products from "./screens/Products";
import ProductDetail from "./screens/ProductDetail";
import Shops from "./screens/Shops";
import ShopDetail from "./screens/ShopDetail";
import CreateProduct from "./screens/CreateProduct";
import SellerProducts from "./screens/SellerProducts";
import Cart from "./screens/Cart";
import EditProduct from "./screens/EditProduct";
import SellerProductDetails from "./screens/SellerProductDetails";
import Order from "./screens/Order";
import History from "./screens/History";
import HistoryDetails from "./screens/HistoryDetails";
import Profile from "./screens/Profile";
import axios from "axios";
import NotFound from "./screens/NotFound";
import { useContext } from "react";

axios.defaults.withCredentials = true;

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  // const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/shop" component={Shops} />
          <Route exact path="/cart" component={isLogged ? Cart : NotFound} />
          <Route
            exact
            path="/seller_product"
            component={isSeller ? SellerProducts : NotFound}
          />
          <Route
            exact
            path="/create_product"
            component={isSeller ? CreateProduct : NotFound}
          />
          <Route
            exact
            path="/edit_product/:id"
            component={isSeller ? EditProduct : NotFound}
          />
          <Route exact path="/login" component={isLogged ? NotFound : Login} />
          <Route exact path="/order" component={isLogged ? Order : NotFound} />
          <Route
            exact
            path="/history"
            component={isLogged ? History : NotFound}
          />
          <Route
            exact
            path="/profile"
            component={isLogged ? Profile : NotFound}
          />
          <Route
            exact
            path="/history_details/:id"
            component={isLogged ? HistoryDetails : NotFound}
          />
          <Route
            exact
            path="/register"
            component={isLogged ? NotFound : Registration}
          />
          <Route exact path="/product_detail/:id" component={ProductDetail} />
          <Route
            exact
            path="/seller_product_detail/:id"
            component={SellerProductDetails}
          />
          <Route exact path="/shop_detail/:id" component={ShopDetail} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
