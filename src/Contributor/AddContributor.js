import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";

const AddContributor = () => {
  //state
  const [state, setState] = useState({
    name: "",
    role: "",
  });
  //destructuring values from state
  const { name, role } = state;
  //onChange event handler
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/contributor`, { name, role })
      .then((response) => {
        setState({ ...state, name: "", role: "" });
        alert(`Contributor "${response.data.name}" was added.`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  //HANDLING GOBACK BUTTON
  const navigate = useNavigate();
  const onCustomButtonClick = (event) => {
    navigate("/contributors");
  };

  return (
    <div className="container">
      <Navigation />
      <div className="mt-80">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              value={name}
              className="form-control"
              type="text"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Role</label>
            <input
              onChange={handleChange("role")}
              value={role}
              className="form-control"
              type="text"
              required
            />
          </div>

          <div className="mt-8">
            <button className="btn btn-success">Add</button>
          </div>
        </form>

        <div className="mt-8">
          <button onClick={onCustomButtonClick} className="btn btn-dark">
            Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddContributor;
