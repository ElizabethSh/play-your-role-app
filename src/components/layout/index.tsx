import React, { Suspense } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import Loader from "@components/loader";

import { logo } from "icons";
import { AppRoute } from "settings";

import "./layout.scss";

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="content">
          {pathname === AppRoute.Root ? (
            logo
          ) : (
            <Link className="link-logo" to={AppRoute.Root}>
              {logo}
            </Link>
          )}
          <nav>
            <ul className="nav-list">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : "nav-link-inactive"
                  }
                  to={AppRoute.Characters}
                >
                  Characters
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : "nav-link-inactive"
                  }
                  to={AppRoute.NewCharacter}
                >
                  Add Character
                </NavLink>
              </li>
            </ul>
          </nav>
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
