import React, { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import AvatarPicker from "@components/avatar/picker";
import Button from "@components/button";
import { useCharacters } from "@context/character";
import NotFoundPage from "@pages/not-found";

import { AppRoute, CORE_ABILITIES } from "settings";
import { Character } from "types/character";

import "../../../index.scss";
import "./form.scss";

const validationErrors = {
  required: "This field is required",
  pattern: "Only letters and spaces are allowed",
};

export type FormFields = {
  name: string;
  notes: string;
  strength: number | "";
  dexterity: number | "";
  constitution: number | "";
  intelligence: number | "";
  wisdom: number | "";
  charisma: number | "";
  image?: string;
};

const CharacterForm: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = React.useState<
    string | undefined
  >(undefined);
  const { addNewCharacter, editCharacter, characters } = useCharacters();
  const navigate = useNavigate();
  const param = useParams();
  const id = useId();

  let title = "Add new character";
  let character: Character | undefined = undefined;
  if (param.id) {
    character = characters.find((character) => character.id === param.id);
    title = "Edit character";
  }

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: character?.name || "",
      notes: character?.notes || "",
      image: character?.avatar || "",
      strength: character?.coreAbilities.strength.score || "",
      dexterity: character?.coreAbilities.dexterity.score || "",
      constitution: character?.coreAbilities.constitution.score || "",
      intelligence: character?.coreAbilities.intelligence.score || "",
      wisdom: character?.coreAbilities.wisdom.score || "",
      charisma: character?.coreAbilities.charisma.score || "",
    },
  });

  if (!character && param.id) {
    return <NotFoundPage />;
  }

  const nameError = errors?.name?.type
    ? validationErrors[errors?.name?.type as keyof typeof validationErrors]
    : "Invalid name";

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (param.id && character) {
      editCharacter(character.id, data, selectedAvatar);
    } else {
      addNewCharacter(data, selectedAvatar);
    }
    navigate(AppRoute.Characters);
  };

  const hasAbilitiesErrors = () => {
    return CORE_ABILITIES.some((ability) => errors[ability]);
  };

  return (
    <section className="main-content new-character">
      <h1 className="main-title new-character-title">{title}</h1>
      <form className="new-character-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="new-character-form-fieldset new-character-name">
          <label
            className="new-character-form-label label required"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="input"
            id="name"
            placeholder="Type your character name here"
            {...register("name", {
              required: true,
              pattern: /^[a-zA-Z\s]+$/,
            })}
            type="text"
          />
          {!!errors.name && <p className="error-message">{nameError}</p>}
          <AvatarPicker
            onSelect={setSelectedAvatar}
            selectedAvatar={selectedAvatar}
            setError={(msg: string) => setError("image", { message: msg })}
            clearError={() => clearErrors("image")}
          />
          {!!errors.image && (
            <p className="error-message">{errors.image.message}</p>
          )}
        </fieldset>
        <fieldset className="new-character-form-fieldset abilities">
          <legend className="new-character-form-legend">Core abilities</legend>
          <ul className="abilities-list">
            {CORE_ABILITIES.map((ability) => (
              <li className="ability" key={ability}>
                <label
                  className="ability-label label required"
                  key={ability}
                  htmlFor={id + ability}
                >
                  {ability}
                </label>
                <input
                  className="ability-input input"
                  id={id + ability}
                  max="20"
                  min="1"
                  placeholder="00"
                  {...register(ability, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                />
              </li>
            ))}
          </ul>
          {hasAbilitiesErrors() && (
            <p className="error-message">All these fields are required</p>
          )}
        </fieldset>
        <fieldset className="new-character-form-fieldset notes">
          <legend className="new-character-form-legend">Notes</legend>
          <label className="label" htmlFor="notes">
            Tell us about character
          </label>
          <textarea
            className="textarea"
            id="notes"
            rows={3}
            {...register("notes", { required: false })}
          />
        </fieldset>
        <div className="new-character-form-buttons">
          <Button variant="danger" type="reset" label="Reset" />
          <Button
            disabled={isSubmitting}
            label={isSubmitting ? "Saving..." : "Save"}
            variant="confirm"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default CharacterForm;
