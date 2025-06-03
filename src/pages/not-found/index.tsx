import React from "react";
import { Link } from "react-router";

import { AppRoute } from "../../settings";

import "./not-found.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="main-title">404 - Page Not Found</h1>
      <p className="not-found-description">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className="button button-primary" to={AppRoute.Root}>
        Go back to the main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
