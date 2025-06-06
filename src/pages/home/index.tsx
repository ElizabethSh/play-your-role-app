import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "../../settings";

import "../../index.scss";
import "./home.scss";

const HomePage: React.FC = () => (
  <div className="home">
    <h1 className="main-title">Start new adventure!</h1>
    <div className="home-buttons">
      <Link
        className="link-as-button button-primary"
        to={AppRoute.NewCharacter}
      >
        Create new character
      </Link>
      <Link className="link-as-button button-primary" to={AppRoute.Characters}>
        View characters
      </Link>
    </div>
  </div>
);

export default HomePage;
