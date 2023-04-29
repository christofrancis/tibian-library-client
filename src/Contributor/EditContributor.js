import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useParams, useNavigate } from "react-router-dom";

const EditContributor = () => {
  let props = useParams();

  const [state, setState] = useState({
    name: "",
    role: "",
  });

  const { name, slug, role } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/contributor/${props.slug}`)
      .then((response) => {
        const { name, slug, role } = response.data;
        setState({ ...state, name, slug, role });
      })
      .catch((error) => alert("Error in loading specific contributor"));
  }, []);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/contributor/${slug}`, { name, role })
      .then((response) => {
        const { slug, role } = response.data;
        setState({ ...state, name, slug, role });
        alert(`Changes at "${name}" were made.`);
        navigate("/contributors");
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit} method="put" encType="multipart/form-data">
      <div className="form-group">
        <h2>{name}</h2>
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
        <button className="btn btn-success">Publish changes</button>
      </div>
    </form>
  );

  //HANDLING GOBACK BUTTON
  const onCustomButtonClick = (event) => {
    navigate("/contributors");
  };

  return (
    <div className="container">
      <Navigation />
      <div className="mt-80">{showUpdateForm()}</div>
      <div className="mt-8">
        <button onClick={onCustomButtonClick} className="btn btn-dark">
          Back
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default EditContributor;
