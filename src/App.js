import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Table from "react-bootstrap/esm/Table";

const App = () => {
  ///////////////////Docs&Papers
  const [docs_and_papers, setDocsAndPapers] = useState([]);
  const docs_and_papersList = docs_and_papers.length;

  const fetchDocsAndPapers = () => {
    axios
      .get(`${process.env.REACT_APP_API}/docs-and-papers`)
      .then((response) => {
        setDocsAndPapers(response.data);
      })
      .catch((error) => alert("Error in fetching doc or paper."));
  };

  useEffect(() => {
    fetchDocsAndPapers();
  }, []);
  /////////////////////// BOOKS
  const [books, setBooks] = useState([]);
  const booksList = books.length;
  const fetchBooks = () => {
    axios
      .get(`${process.env.REACT_APP_API}/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => alert("Error in fetching books."));
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  /////////////////////////////DONATORS
  const [donators, setDonators] = useState([]);
  const donatorsList = donators.length;

  const fetchDonators = () => {
    axios
      .get(`${process.env.REACT_APP_API}/donators`)
      .then((response) => {
        setDonators(response.data);
      })
      .catch((error) => alert("Error at fetching donators"));
  };

  useEffect(() => {
    fetchDonators();
  }, []);
  /////////////////////////////contributors
  const [contributors, setContributors] = useState([]);
  const contributorsList = contributors.length;

  const fetchContributors = () => {
    axios
      .get(`${process.env.REACT_APP_API}/contributors`)
      .then((response) => {
        setContributors(response.data);
      })
      .catch((error) => alert("Error at fetching contributors"));
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  ////////////////////////////////
  return (
    <div className="container">
      <Navigation />
      <div className="mt-35vh mx-vw">
        <Table
          className="table table-striped table-bordered welcome"
          responsive="sm"
        >
          <thead>
            <tr>
              <th className="bg-success text-black" colSpan={2}>
                <span className="welcome_to">
                  <span className="text-library">Tibian Library</span>
                </span>
                <br />
                <span className="description">
                  Your reliable source of books, documents and papers collected
                  from the world of Tibia MMORPG
                </span>
              </th>
            </tr>
            <tr>
              <th colSpan={2}>
                Our website in numbers{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-emoji-smile"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Books</td>
              <td>
                <b>
                  {booksList ? (
                    booksList
                  ) : (
                    <b>
                      <span className="one">.</span>{" "}
                      <span className="two">.</span>{" "}
                      <span className="three">.</span>
                    </b>
                  )}
                </b>
              </td>
            </tr>
            <tr>
              <td>Docs and Papers</td>
              <td>
                <b>
                  {docs_and_papersList ? (
                    docs_and_papersList
                  ) : (
                    <b>
                      <span className="one">.</span>{" "}
                      <span className="two">.</span>{" "}
                      <span className="three">.</span>
                    </b>
                  )}
                </b>
              </td>
            </tr>

            <tr>
              <td>Contributors</td>
              <td>
                <b>
                  {contributorsList ? (
                    contributorsList
                  ) : (
                    <b>
                      <span className="one">.</span>{" "}
                      <span className="two">.</span>{" "}
                      <span className="three">.</span>
                    </b>
                  )}
                </b>
              </td>
            </tr>
            <tr>
              <td>Donators</td>
              <td>
                <b>
                  {donatorsList ? (
                    donatorsList
                  ) : (
                    <b>
                      <span className="one">.</span>{" "}
                      <span className="two">.</span>{" "}
                      <span className="three">.</span>
                    </b>
                  )}
                </b>
              </td>
            </tr>
            <tr>
              <td className="bg-dark text-white" colSpan={2}>
                We collect information <b>ONLY</b> from items which appear
                repetitively after every Server Save.
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default App;
