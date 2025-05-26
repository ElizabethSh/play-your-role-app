import React from "react";
import { Link } from "react-router";

import { AppRoute } from "../../../settings";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={AppRoute.Root}>Go back to the main page</Link>
    </div>
  );
};

export default NotFoundPage;
