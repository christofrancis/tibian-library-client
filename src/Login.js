import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { authorization, getAdminUser } from "./helpers";

const Login = () => {
  const navigate = useNavigate();

  //state
  const [state, setState] = useState({
    password: "",
  });
  //destructuring values from state
  const { password } = state;

  //disable option to go /login when already logged in
  useEffect(() => {
    getAdminUser() && navigate("/");
  }, []);

  //onChange event handler
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  //onSubmit event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({password})
    axios
      .post(`${process.env.REACT_APP_API}/login`, { password })
      .then((response) => {
        //   console.log(response)
        //after succesful login we get response which will save token and name in session storage and after that user will be navigated to home
        authorization(response, () => {
          navigate("/");
        });
      })
      .catch((error) => {
        // console.log(error.response)
        alert(error.response.data.error);
      });
  };

  return (
    <div className="container">
      <Navigation />
      <div className="mt-35vh mx-vw">
        <div className="new-mt">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
                required
              />
            </div>

            <div className="mt-4">
              <button className="btn btn-success">Log in</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
