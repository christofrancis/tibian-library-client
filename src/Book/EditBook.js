import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const config = {
  readonly: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  placeholder: "",
  toolbarButtonSize: "small",
  removeButtons: ["about"],
  height: "10vh",
};

const EditBook = () => {
  let props = useParams();

  const [state, setState] = useState({
    title: "",
    slug: "",
    location: "",
    content: "",
    finder: "",
    keywords: "",
    map_pin: "",
    cover: "",
  });

  //rich text state
  const [content, setContent] = useState("");

  const {
    title,
    slug,
    location,
    map_pin,
    cover,
    finder,
    keywords,
  } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/book/${props.slug}`)
      .then((response) => {
        const {
          title,
          content,
          map_pin,
          cover,
          location,
          finder,
          slug,
          keywords,
        } = response.data;
        setState({
          ...state,
          title,
          slug,
          map_pin,
          cover,
          location,
          finder,
          keywords,
        });
        setContent(content);
      })
      .catch((error) => alert("Error in loading specific book."));
  }, []);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/book/${slug}`, {
        content,
        finder,
        keywords,
        location,
        map_pin,
        cover,
      })
      .then((response) => {
        const {
          title,
          content,
          slug,
          finder,
          map_pin,
          cover,
          location,
          keywords,
        } = response.data;
        setState({
          ...state,
          title,
          content,
          slug,
          map_pin,
          cover,
          finder,
          location,
          keywords,
        });
        alert(`Changes in "${title}" were made.`);
        navigate(`/book/${slug}`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group flex-display">
        <div>
          <img className="cover-image" src={cover} alt=""></img>
        </div>
        <div className="flex-display-h2">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="editor">
        <label className="text-muted">Content</label>
        <JoditEditor
          value={content}
          className="form-control"
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Keywords</label>
        <input
          onChange={handleChange("keywords")}
          value={keywords}
          className="form-control"
          type="text"
          required
        />
      </div>

      <div className="div-left-right">
        <div className="div-left">
          <div className="form-group">
            <label className="text-muted ">Finder</label>
            <input
              onChange={handleChange("finder")}
              value={finder}
              className="form-control"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Location</label>
            <input
              onChange={handleChange("location")}
              value={location}
              className="form-control"
              type="text"
              required
            />
          </div>
        </div>

        <div className="div-middle">
          <div className="form-group">
            <label className="text-muted">Map pin URL</label>
            <input
              onChange={handleChange("map_pin")}
              value={map_pin}
              className="form-control"
              type="text"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="text-muted ">Cover URL</label>
          <input
            onChange={handleChange("cover")}
            value={cover}
            className="form-control"
            type="text"
            required
          />
        </div>
      </div>

      <div className="mt-8">
        <button className="btn btn-success">Accept changes</button>
      </div>
    </form>
  );

  //HANDLING GOBACK BUTTON
  const onCustomButtonClick = (event) => {
    navigate("/books");
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
export default EditBook;
