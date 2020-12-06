import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ExampleContext from "../ExampleContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

const Header = ({ loggedIn }) => {

  const { setLoggedIn } = useContext(ExampleContext);

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {loggedIn ? (
          <HeaderLoggedIn/>
        ) : (
          <HeaderLoggedOut/>
        )}
      </div>
    </header>
  );
};

export default Header;
