import React from "react";
import "../style/header.css";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <>
      <header id="header">
        <nav>
          <a>
            <Link to="/">Home</Link>
          </a>
          <a>
            <Link to="/AnimeList">Anime List</Link>
          </a>
        </nav>
      </header>
    </>
  );
};

export default header;
