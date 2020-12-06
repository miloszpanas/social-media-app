import React, { useState, useReducer } from "react";
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
import ExampleContext from "./ExampleContext";

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
    <ExampleContext.Provider value={{addFlashMessage, setLoggedIn}}>
      <Router>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/about-us" exact component={About} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/create-post">
            <CreatePost/>
          </Route>
          <Route path="/post/:id" component={ViewSinglePost}/>
        </Switch>
        <Footer />
      </Router>
    </ExampleContext.Provider>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
