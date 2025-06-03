import React from "react";

import { CORE_ABILITIES } from "../../../settings";

import "./form.css";
import "../../../index.css";

const CharacterForm: React.FC = () => {
  return (
    <section className="main-content new-character">
      <h1 className="main-title new-character-title">Add new character</h1>
      <form className="new-character-form" method="post">
        <fieldset className="new-character-form-fieldset new-character-name">
          <label className="new-character-form-label label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Type your character name here"
          />
        </fieldset>
        <fieldset className="new-character-form-fieldset abilities">
          <legend className="abilities-title">Core abilities</legend>
          <ul className="abilities-list">
            {CORE_ABILITIES.map((ability) => (
              <li className="ability" key={ability}>
                <label
                  className="ability-label label"
                  key={ability}
                  htmlFor={ability}
                >
                  {ability.charAt(0).toUpperCase() + ability.slice(1)}
                </label>
                <input
                  className="ability-input input"
                  id={ability}
                  max="16"
                  min="8"
                  name={ability}
                  placeholder="00"
                  type="number"
                />
              </li>
            ))}
          </ul>
        </fieldset>
        <div className="new-character-form-buttons">
          <button className="button cancel-button" type="reset">
            Reset
          </button>
          <button className="button submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default CharacterForm;
