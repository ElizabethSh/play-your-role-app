import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/layout";
import Loader from "@components/loader";
import { AppRoute } from "settings";

const NotFoundPage = React.lazy(() => import("@pages/not-found"));
const HomePage = React.lazy(() => import("@pages/home"));
const CharactersPage = React.lazy(() => import("@pages/characters/list"));
const CharacterDetailsPage = React.lazy(() => import("@pages/characters/item"));
const CharacterFormPage = React.lazy(() => import("@pages/characters/form"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoute.Root} element={<HomePage />} />
          <Route path={AppRoute.Characters} element={<CharactersPage />} />
          <Route path={AppRoute.Character} element={<CharacterDetailsPage />} />
          <Route
            path={AppRoute.EditCharacter}
            element={<CharacterFormPage />}
          />
          <Route path={AppRoute.NewCharacter} element={<CharacterFormPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
