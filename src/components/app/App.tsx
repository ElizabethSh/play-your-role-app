import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

import { AppRoute } from "../../settings";
import Layout from "../layout";
import Loader from "../loader";

const NotFoundPage = React.lazy(() => import("../pages/not-found"));
const HomePage = React.lazy(() => import("../pages/home"));
const CharacterPage = React.lazy(() => import("../pages/characters/list"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoute.Root} element={<HomePage />} />
          <Route path={AppRoute.Characters} element={<CharacterPage />} />
          <Route path={AppRoute.Character} />
          <Route path={AppRoute.NewCharacter} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
