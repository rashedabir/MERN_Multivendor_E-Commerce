import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { DataProvider } from "./GlobalState";
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

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/shop" component={Shops} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/seller_product" component={SellerProducts} />
            <Route exact path="/create_product" component={CreateProduct} />
            <Route exact path="/edit_product/:id" component={EditProduct} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/history" component={History} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/product_detail/:id" component={ProductDetail} />
            <Route
              exact
              path="/seller_product_detail/:id"
              component={SellerProductDetails}
            />
            <Route exact path="/shop_detail/:id" component={ShopDetail} />
          </Switch>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
