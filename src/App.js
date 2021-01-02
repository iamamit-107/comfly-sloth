import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from "./pages/index";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:id" component={SingleProductPage} />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
