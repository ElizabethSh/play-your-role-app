import React, { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { logo } from "../../icons";
import { AppRoute } from "../../settings";
import Loader from "../loader";

import "./layout.scss";

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="content">
          {pathname === "/" ? logo : <Link to={AppRoute.Root}>{logo}</Link>}
        </div>
      </header>
      <main className="layout-main">
        <div className="content">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer className="layout-footer">
        All rights reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
