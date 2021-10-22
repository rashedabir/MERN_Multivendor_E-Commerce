import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { DataProvider } from "./GlobalState";
import Products from "./screens/Products";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
          </Switch>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
