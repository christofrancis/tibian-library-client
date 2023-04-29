import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Footer from "../Footer";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";
import { getAdminUser } from "../helpers";

const Donators = () => {
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

  const deleteConfirm = (slug) => {
    let answer = window.confirm(`Are You sure to delete donator: "${slug}" ?`);
    if (answer) {
      deleteDonator(slug);
    }
  };
  const deleteDonator = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/donator/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchDonators();
      })
      .catch((error) => alert("Error in deleting donator."));
  };

  return (
    <div className="container">
      <Navigation />
      <Table className="table table-striped table-bordered" responsive="sm">
        <thead>
          <tr>
            <th className="bg-success text-black" colSpan={5}>
              Donators
            </th>
          </tr>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Amount</th>
            {getAdminUser() && <th>-</th>}
            {getAdminUser() && <th>-</th>}
          </tr>
        </thead>
        <tbody>
          {donatorsList ? (
            donators.map((donator, i) => (
              <tr key={donator._id}>
                <td>
                  <a target="blank" href={donator.image.url}>
                    <img
                      className="donator-image"
                      src={donator.image.url}
                      alt={donator.name}
                    />
                  </a>
                </td>
                <td className="tytul">
                  <a
                    target="blank"
                    href={`https://www.tibia.com/community/?name=${donator.name}`}
                  >
                    {donator.name}
                  </a>
                </td>
                <td>{donator.amount}</td>
                {getAdminUser() && (
                  <td>
                    <Link to={`/donator/edit/${donator.slug}`}>
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
                      onClick={() => deleteConfirm(donator.slug)}
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
              <td className="bg-danger text-white" colSpan={5}>
                <b>
                  Connecting to server, please wait{" "}
                  <span className="one">.</span> <span className="two">.</span>{" "}
                  <span className="three">.</span>
                </b>
              </td>
            </tr>
          )}
          <tr>
            <td className="bg-dark text-white" colSpan={5}>
              {" "}
              If You like our idea and want to support us, You can send donation
              with Tibia Coins on character <b>Hollow Sorrow</b>.
            </td>
          </tr>
        </tbody>
      </Table>
      {getAdminUser() && (
        <div className="d-flex justify-content-center mt-8">
          <Button as={Link} to="/add-donator" variant="success">
            Add new donator
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Donators;
