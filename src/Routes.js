import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PrivateAddBookRoute from "./PrivateAddBookRoute";
import PrivateAddDocAndPaperRoute from "./PrivateAddDocAndPaperRoute";

import Books from "./Book/Books";
import AddBook from "./Book/AddBook";
import SingleBook from "./Book/SingleBook";
import EditBook from "./Book/EditBook";

import Donators from "./Donator/Donators";
import AddDonator from "./Donator/AddDonator";
import EditDonator from "./Donator/EditDonator";

import Contributors from "./Contributor/Contributors";
import AddContributor from "./Contributor/AddContributor";
import EditContributor from "./Contributor/EditContributor";

import DocsAndPapers from "./DocAndPaper/DocsAndPapers";
import AddDocAndPaper from "./DocAndPaper/AddDocAndPaper";
import SingleDocAndPaper from "./DocAndPaper/SingleDocAndPaper";
import EditDocAndPaper from "./DocAndPaper/EditDocAndPaper";

import Contact from "./Contact";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add-book"
          element={
            <PrivateAddBookRoute>
              <AddBook />
            </PrivateAddBookRoute>
          }
        />
        <Route path="/book/:slug" element={<SingleBook />} />
        <Route
          path="/book/edit/:slug"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        />

        <Route path="/donators" element={<Donators />} />
        <Route
          path="/add-donator"
          element={
            <PrivateRoute>
              <AddDonator />
            </PrivateRoute>
          }
        />
        <Route
          path="/donator/edit/:slug"
          element={
            <PrivateRoute>
              <EditDonator />
            </PrivateRoute>
          }
        />

        <Route path="/contributors" element={<Contributors />} />
        <Route
          path="/add-contributor"
          element={
            <PrivateRoute>
              <AddContributor />
            </PrivateRoute>
          }
        />
        <Route
          path="/contributor/edit/:slug"
          element={
            <PrivateRoute>
              <EditContributor />
            </PrivateRoute>
          }
        />

        <Route path="/docs-and-papers" element={<DocsAndPapers />} />
        <Route
          path="/add-doc-and-paper"
          element={
            <PrivateAddDocAndPaperRoute>
              <AddDocAndPaper />
            </PrivateAddDocAndPaperRoute>
          }
        />
        <Route path="/doc-and-paper/:slug" element={<SingleDocAndPaper />} />
        <Route
          path="/doc-and-paper/edit/:slug"
          element={
            <PrivateRoute>
              <EditDocAndPaper />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
