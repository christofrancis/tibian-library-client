import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAdminUser, logout } from "./helpers";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar className="py-4" expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img
            className="nav-logo"
            alt="logo"
            src={require("./images/logo.png")}
            onClick={() => {
              window.dataLayer.push({ event: "button-click" });
            }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className=" justify-content-center"
        >
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/books"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Books
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/docs-and-papers"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Docs & Papers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contributors"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Contributors
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/donators"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Donators
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/discord"
              onClick={() => {
                window.dataLayer.push({ event: "button-click" });
              }}
            >
              Discord
            </Nav.Link>
            {getAdminUser() && (
              <Nav.Link
                className="btn btn-danger"
                onClick={() => logout(() => navigate("/"))}
              >
                Log out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
