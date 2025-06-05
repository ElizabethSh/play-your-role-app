import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useCharacters } from "../../../context/character";
import { AppRoute, CORE_ABILITIES } from "../../../settings";

import "./form.scss";
import "../../../index.scss";

export type FormFields = {
  name: string;
  notes: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

const CharacterForm: React.FC = () => {
  const { addNewCharacter } = useCharacters();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (Object.keys(errors).length === 0) {
      addNewCharacter(data);
      navigate(AppRoute.Characters);
    }
  };

  const checkAbilitiesErrors = () => {
    const errorKeys = Object.keys(errors);
    return errorKeys.some((errorKey) =>
      CORE_ABILITIES.includes(errorKey as (typeof CORE_ABILITIES)[number])
    );
  };

  return (
    <section className="main-content new-character">
      <h1 className="main-title new-character-title">Add new character</h1>
      <form className="new-character-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="new-character-form-fieldset new-character-name">
          <label className="new-character-form-label label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            id="name"
            placeholder="Type your character name here"
            {...register("name", { required: true })}
            type="text"
          />
          {!!errors.name && (
            <p className="error-message">This field is required</p>
          )}
        </fieldset>
        <fieldset className="new-character-form-fieldset abilities">
          <legend className="new-character-form-legend">Core abilities</legend>
          <ul className="abilities-list">
            {CORE_ABILITIES.map((ability) => (
              <li className="ability" key={ability}>
                <label
                  className="ability-label label"
                  key={ability}
                  htmlFor={ability}
                >
                  {ability}
                </label>
                <input
                  className="ability-input input"
                  id={ability}
                  max="20"
                  min="1"
                  placeholder="00"
                  {...register(ability, { required: true })} // make it required
                  type="number"
                />
              </li>
            ))}
          </ul>
          {checkAbilitiesErrors() && (
            <p className="error-message">All these fields are required</p>
          )}
        </fieldset>
        <fieldset className="new-character-form-fieldset notes">
          <legend className="new-character-form-legend">Notes</legend>
          <label className="label">Tell us about character</label>
          <textarea
            className="textarea"
            rows={3}
            {...register("notes", { required: false })}
          />
        </fieldset>
        <div className="new-character-form-buttons">
          <button className="button cancel-button" type="reset">
            Reset
          </button>
          <button
            className="button submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CharacterForm;
