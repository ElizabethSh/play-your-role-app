import React from "react";
import { Link } from "react-router";

import { AppRoute } from "../../../settings";

import "../../../index.css";
import "./home.css";

const HomePage: React.FC = () => (
  <div className="home">
    <h1 className="home-title">Start new adventure!</h1>
    <div className="home-buttons">
      <Link className="button" to={AppRoute.NewCharacter}>
        Create new character
      </Link>
      <Link className="button" to={AppRoute.Characters}>
        View characters
      </Link>
    </div>
  </div>
);

export default HomePage;
