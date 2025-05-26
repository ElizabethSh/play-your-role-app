import React, { Suspense } from "react";
import { Outlet } from "react-router";

import { logo } from "../../icons";
import Loader from "../loader";

import "./layout.css";

const Layout: React.FC = () => (
  <div className="layout">
    <header className="layout-header">
      <div className="content">{logo}</div>
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

export default Layout;
