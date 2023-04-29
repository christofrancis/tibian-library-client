import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import moment from "moment";
import Table from "react-bootstrap/esm/Table";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAdminUser } from "../helpers";

const SingleBook = () => {
  let props = useParams();
  const [book, setBook] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/book/${props.slug}`)
      .then((response) => setBook(response.data))
      .catch((error) => alert("error in loading specific book"));
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      `Are You sure to delete book with title: "${slug}" ?`
    );
    if (answer) {
      deleteBook(slug);
    }
  };
  const navigate = useNavigate();
  const deleteBook = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/book/${slug}`)
      .then((response) => {
        alert(response.data.message);
        navigate("/books");
      })
      .catch((error) => alert("Error in deleting book."));
  };

  //HANDLING GOBACK BUTTON
  const onCustomButtonClick = (event) => {
    navigate("/books");
  };

  return (
    <div className="container">
      <Navigation />
      <Table
        className="single-post table table-striped table-hover table-bordered "
        responsive="sm"
      >
        <thead>
          <tr>
            <td className="img-cont">
              <img className="cover-image" src={book.cover} alt=""></img>
            </td>
            <th scope="col">
              <span className="font-weight-bold">{book.title}</span>
            </th>
            {getAdminUser() && <th>-</th>}
            {getAdminUser() && <th>-</th>}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={2}>
              <div dangerouslySetInnerHTML={{ __html: book.content }} />
            </td>
            {getAdminUser() && (
              <td>
                <Link to={`/book/edit/${book.slug}`}>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </i>
                </Link>
              </td>
            )}
            {getAdminUser() && (
              <td>
                <svg
                  onClick={() => deleteConfirm(book.slug)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </td>
            )}
          </tr>
          <tr>
            <td className="map-pin-cont">
              <span>Map pin:</span>{" "}
              <a
                className="font-weight-bold"
                target="blank"
                href={book.map_pin}
              >
                LINK
              </a>
            </td>
            <td>
              <span className="font-weight-bold">Location:</span>{" "}
              {book.location}
            </td>
          </tr>
          <tr>
            <td>
              <span className="font-weight-bold">Date:</span>{" "}
              {moment(book.createdAt).format("DD-MM-YYYY")}
            </td>
            <td colSpan={1}>
              <span>Finder:</span>
              <a
                className="font-weight-bold"
                target="blank"
                href={`https://www.tibia.com/community/?name=${book.finder}`}
              >
                {" "}
                {book.finder}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="mt-8">
        <button onClick={onCustomButtonClick} className="btn btn-dark">
          Back
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default SingleBook;
