import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import Loading from '../components/Loading';
import { expensesToDefault, getExpenes, saveExpense } from '../store/entities/expenses';
import { getHives, loadHives } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { translate } from '../utils/utils';

function CreateExpense() {
  const [amount, setAmount] = useState<"" | number>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string | number>(new Date().getTime());
  const [hive, setHive] = useState("");
  const hives = useAppSelector(getHives);
  const expenses = useAppSelector(getExpenes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadHives());
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveExpense(amount, description, date, hive));
  };
  const saveMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAmount("");
    setDescription("");
    setHive("");
    setDate(new Date().getTime());
    dispatch(expensesToDefault());
  };
  if (hives.state) return <Loading />;
  return (
    <main className="">
      <form className="exp-form form-secondary" onSubmit={handleSubmit}>
        <h1 className="form-title">{translate("nuevoGasto")}</h1>
        <label htmlFor="amount-in">{translate("cantidad")}</label>
        <input
          type="number"
          name=""
          id="amount-in"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <label htmlFor="desc-in">{translate("descripcion")}</label>
        <input
          type="text"
          name=""
          id="desc-in"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="date-in">{translate("fecha")}</label>
        <input
          type="date"
          name=""
          id="date-in"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="hive-in">{translate("colmena")}</label>
        <select
          name=""
          id="hive-in"
          value={hive}
          onChange={(e) => setHive(e.target.value)}
        >
          {hives.list.map((hive) => (
            <option value={hive._id}>{hive.name}</option>
          ))}
          <option value="N/A">N/A</option>
        </select>
        {expenses.error && (
          <p className="err-msg">{translate(expenses.error)}</p>
        )}
        <button
          className="btn btn-primary mx-auto"
          onClick={expenses.state === "saved" ? saveMoreHandler : undefined}
        >
          {expenses.state === "saving" && <ButtonSpinner />}

          {expenses.state === "saved" ? (
            <>
              <i className="fas fa-check"></i>
              {translate("unoMas")}
            </>
          ) : (
            translate("sv")
          )}
        </button>
      </form>
    </main>
  );
}

export default CreateExpense;
