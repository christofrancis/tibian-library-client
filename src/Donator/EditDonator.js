import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useParams, useNavigate } from "react-router-dom";

const EditDonators = () => {
  let props = useParams();

  const [state, setState] = useState({
    name: "",
    slug: "",
    amount: "",
  });
  const { name, slug, amount } = state;

  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/donator/${props.slug}`)
      .then((response) => {
        const { image, name, slug, amount } = response.data;
        setState({ ...state, name, slug, amount });
        setImage(image.url);
      })
      .catch((error) => alert("Error at loading specific donator."));
  }, []);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/donator/${slug}`, {
        image,
        name,
        amount,
      })
      .then((response) => {
        const { slug, amount } = response.data;
        setState({ ...state, name, slug, amount });
        alert(`Changes for "${response.data.name}" were made.`);
        navigate("/donators");
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
        <img width="100" src={image} alt="" />
      </div>

      <div className="form-group">
        <label className="text-muted">Amount</label>
        <input
          onChange={handleChange("amount")}
          value={amount}
          className="form-control"
          type="number"
          required
        />
      </div>

      <div className="mt-8">
        <button className="btn btn-success">Accept changes</button>
      </div>
    </form>
  );

  //HANDLING GOBACK BUTTON
  const onCustomButtonClick = (event) => {
    navigate("/donators");
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
export default EditDonators;
