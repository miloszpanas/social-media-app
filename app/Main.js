import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import {
  CreatePost,
  Header,
  HomeGuest,
  Footer,
  About,
  Terms,
  Home,
} from "./components";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexAppToken"))
  );

  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/about-us" exact component={About} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/create-post" component={CreatePost} />
      </Switch>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
