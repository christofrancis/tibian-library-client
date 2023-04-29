import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";

const AddDonator = () => {
  //state
  const [state, setState] = useState({
    name: "",
    amount: "",
  });
  //destructuring values from state
  const { name, amount } = state;
  //onChange event handler
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  //UPLOADING IMAGE
  const [image, setImage] = useState("");
  const handleImage = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
    // console.log(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/donator`, { image, name, amount })
      .then((response) => {
        setState({ ...state, name: "", amount: "" });
        setImage("");
        alert(`Donator "${response.data.name}" added`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  //HANDLING GOBACK BUTTON
  const navigate = useNavigate();
  const onCustomButtonClick = (event) => {
    navigate("/donators");
  };

  return (
    <div className="containerAddOrEdit">
      <Navigation />
      <div className="mt-80">
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
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
            <label className="text-muted">Amount</label>
            <input
              onChange={handleChange("amount")}
              value={amount}
              className="form-control"
              type="number"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Image</label>
            <input
              onChange={handleImage}
              className="form-control-file"
              type="file"
            />
            <img className="mt-8" width="100" src={image} alt="" />
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

export default AddDonator;
