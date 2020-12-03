import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

// components
import {
  CreatePost,
  Header,
  HomeGuest,
  Footer,
  About,
  Terms,
  Home,
  ViewSinglePost,
  FlashMessages
} from "./components";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexAppToken"))
  );

  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (msg) => {
    // setFlashMessages(prev => prev.concat(msg));
    setFlashMessages([ ...flashMessages, msg ]);
  }

  return (
    <Router>
      <FlashMessages messages={flashMessages} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/about-us" exact component={About} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/create-post">
          <CreatePost addFlashMessage={addFlashMessage}/>
        </Route>
        <Route path="/post/:id" component={ViewSinglePost}/>
      </Switch>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
