import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About"
import Terms from "./components/Terms"

const Main = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeGuest}/>
        <Route path="/about-us" exact component={About}/>
        <Route path="/terms" exact component={Terms}/>
      </Switch>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
