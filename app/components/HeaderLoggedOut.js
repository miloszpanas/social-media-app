import React, { useState } from "react";
import axios from "axios"

const HeaderLoggedOut = ({ setLoggedIn }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleFormSubmit = async e => {
    const { username, password } = formValues;
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", { username, password });
      if (response.data) {
        localStorage.setItem("complexAppToken", response.data.token)
        localStorage.setItem("complexAppUsername", response.data.username)
        localStorage.setItem("complexAppAvatar", response.data.avatar)
        setLoggedIn(true)
      } else {
        console.log("incorrect username/password");
      }
    } catch(e) {
      console.log(e, "There was a problem");
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default HeaderLoggedOut;
