import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";
import { getAdminUser } from "../helpers";

const DocsAndPapers = () => {
  const [docs_and_papers, setDocAndPapers] = useState([]);
  const docs_and_papersList = docs_and_papers.length;

  const fetchDocsAndPapers = () => {
    axios
      .get(`${process.env.REACT_APP_API}/docs-and-papers`)
      .then((response) => {
        setDocAndPapers(response.data);
      })
      .catch((error) => alert("Error in fetching doc_and_papers."));
  };
  useEffect(() => {
    fetchDocsAndPapers();
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      `Are You sure to delete doc_and_paper with title: "${slug}" ?`
    );
    if (answer) {
      deleteDocAndPaper(slug);
    }
  };
  const deleteDocAndPaper = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/doc-and-paper/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchDocsAndPapers();
      })
      .catch((error) => alert("Error in deleting doc_and_paper."));
  };

  return (
    <div className="container">
      <Navigation />
      <Table className="table table-striped table-bordered " responsive="sm">
        <thead>
          <tr>
            <th className="bg-success text-black" colSpan={6}>
              Docs & Papers
            </th>
          </tr>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Location</th>
            <th>Keywords</th>
            {getAdminUser() && <th>-</th>}
            {getAdminUser() && <th>-</th>}
          </tr>
        </thead>
        <tbody>
          {docs_and_papersList ? (
            docs_and_papers.map((doc_and_paper, i) => (
              <tr key={doc_and_paper._id}>
                <td>
                  <img
                    className="cover-image"
                    src={doc_and_paper.cover}
                    alt=""
                  ></img>
                </td>
                <td className="tytul">
                  <Link
                    to={`/doc-and-paper/${doc_and_paper.slug}`}
                    onClick={() => {
                      window.dataLayer.push({ event: "button-click" });
                    }}
                  >
                    {doc_and_paper.title}
                  </Link>
                </td>
                <td>{doc_and_paper.location}</td>
                <td>{doc_and_paper.keywords}</td>

                {getAdminUser() && (
                  <td>
                    <Link to={`/doc-and-paper/edit/${doc_and_paper.slug}`}>
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
                      onClick={() => deleteConfirm(doc_and_paper.slug)}
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
            ))
          ) : (
            <tr>
              <td className="bg-danger text-white" colSpan={6}>
                <b>
                  Connecting to server, please wait{" "}
                  <span className="one">.</span> <span className="two">.</span>{" "}
                  <span className="three">.</span>
                </b>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {getAdminUser() && (
        <div className="d-flex justify-content-center mt-8">
          <Button as={Link} to="/add-doc-and-paper" variant="success">
            Add new doc / paper
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DocsAndPapers;
