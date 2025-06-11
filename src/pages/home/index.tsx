import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "../../settings";

import "../../index.scss";
import "./home.scss";

const HomePage: React.FC = () => (
  <div className="home">
    <h1 className="app-title">Play your role!</h1>
    <p className="home-description">Start new adventure!</p>
    <div className="home-buttons">
      <Link
        className="link-as-button link-as-button-primary"
        to={AppRoute.NewCharacter}
      >
        Create new character
      </Link>
      <Link
        className="link-as-button link-as-button-primary"
        to={AppRoute.Characters}
      >
        View characters
      </Link>
    </div>
  </div>
);

export default HomePage;
