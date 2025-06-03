import React from "react";
import { Link } from "react-router";

import { AppRoute } from "../../settings";

import "../../index.css";
import "./home.css";

const HomePage: React.FC = () => (
  <div className="home">
    <h1 className="main-title">Start new adventure!</h1>
    <div className="home-buttons">
      <Link className="button button-primary" to={AppRoute.NewCharacter}>
        Create new character
      </Link>
      <Link className="button button-primary" to={AppRoute.Characters}>
        View characters
      </Link>
    </div>
  </div>
);

export default HomePage;
