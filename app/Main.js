import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

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
  FlashMessages,
  Profile,
  EditPost
} from "./components";

const Main = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexAppToken"),
      username: localStorage.getItem("complexAppUsername"),
      avatar: localStorage.getItem("complexAppAvatar"),
    }
  };

  function OurReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(OurReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexAppToken", state.user.token)
      localStorage.setItem("complexAppUsername", state.user.username)
      localStorage.setItem("complexAppAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("complexAppToken");
      localStorage.removeItem("complexAppUsername");
      localStorage.removeItem("complexAppAvatar");
    }
  }, [state.loggedIn])

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
            <Route path="/about-us" component={About} />
            <Route path="/terms" component={Terms} />
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id/edit" exact>
              <EditPost />
            </Route>
            <Route path="/post/:id" exact component={ViewSinglePost} />
            <Route path="/profile/:username" component={Profile}/>
          </Switch>
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ReactDOM.render(<Main />, document.querySelector("#app"));
