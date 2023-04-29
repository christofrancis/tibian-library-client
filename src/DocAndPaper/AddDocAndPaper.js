import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";
import JoditEditor from "jodit-react";
import slugify from "slugify";

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

const AddDocAndPaper = () => {
  //state
  const [state, setState] = useState({
    title: "",
    location: "",
    finder: "",
    keywords: "",
    map_pin: "",
    screenshot: "",
    cover: "",
  });

  //rich text state
  const [content, setContent] = useState("");

  //destructuring values from state
  const { screenshot, title, cover, location, finder, keywords, map_pin } =
    state;

  //onChange event handler
  const handleChange = (title) => (event) => {
    setState({ ...state, [title]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/doc-and-paper`, {
        screenshot,
        cover,
        title,
        location,
        content,
        finder,
        keywords,
        map_pin,
      })
      .then((response) => {
        setState({
          ...state,
          title: "",
          location: "",
          screenshot: "",
          finder: "",
          keywords: "",
          map_pin: "",
          cover: "",
        });
        setContent("");
        alert(`DocAndPaper "${response.data.title}" added.`);
        const slug_title = slugify(response.data.title, { lower: true });
        navigate(`/doc-and-paper/${slug_title}`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  //HANDLING GOBACK BUTTON
  const navigate = useNavigate();
  const onCustomButtonClick = (event) => {
    navigate("/docs-and-papers");
  };

  return (
    <div className="container">
      <Navigation />
      <div className="mt-80">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Title</label>
            <input
              onChange={handleChange("title")}
              value={title}
              className="form-control"
              type="text"
              required
            />
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
            <button className="btn btn-success">Publish</button>
            <button
              onClick={onCustomButtonClick}
              className="back-btn btn btn-dark"
            >
              Back
            </button>
          </div>
        </form>

        {/* <div className="mt-8">
          <button onClick={onCustomButtonClick} className="btn btn-dark">
            Back
          </button>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default AddDocAndPaper;
