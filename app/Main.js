import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

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

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: []
  };

  // todo CONTINUE FROM 34 Immer

  function OurReducer(state, action) {
    switch(action.type) {
      case "login":
        return {loggedIn: true, flashMessages: state.flashMessages};
      case "logout":
        return {loggedIn: false, flashMessages: state.flashMessages};
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: [ ...state.flashMessages, action.value ]};
    }
  }

  const [state, dispatch] = useReducer(OurReducer, initialState);


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
