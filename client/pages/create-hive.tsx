import { FormEvent, MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import { useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import LogingNeeded from '../components/LogingNeeded';
import { getHives, hivesToDefault, saveHive } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/user/user';
import { translate } from '../utils/utils';

function CreateHive() {
  const dispatch = useAppDispatch();
  const hives = useAppSelector(getHives);
  const user = useAppSelector(getUser);
  const [name, setName] = useState("");
  const [date, setDate] = useState<string | number>(new Date().getTime());
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveHive(name, date));
  };
  const saveMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setName("");
    setDate(new Date().getTime());
    dispatch(hivesToDefault());
  };
  if (user.id === "") return <LogingNeeded />;
  return (
    <main>
      <form className="hive-form form-secondary" onSubmit={submitHandler}>
        <h1 className="form-title">{translate("nuevaColmena")}</h1>
        <label htmlFor="name-in" id="name-in-label">
          {translate("nombre")}
        </label>
        <input
          type="text"
          name=""
          id="name-in"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="date-in" id="date-in-label">
          {translate("fechaDeInstalacion")}
        </label>

        <input
          type="date"
          name=""
          id="date-in"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {hives.state === "load-failed" && (
          <p className="err-msg">{translate(hives.error)}</p>
        )}
        <button
          className="btn btn-primary mx-auto"
          onClick={hives.state === "saved" ? saveMoreHandler : undefined}
        >
          {hives.state === "saving" && <ButtonSpinner />}
          {hives.state === "saved" ? (
            <>
              <i className="fas fa-check"></i> {translate("unoMas")}
            </>
          ) : (
            translate("sv")
          )}
        </button>
      </form>
    </main>
  );
}

export default CreateHive;
