import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import Loading from '../components/Loading';
import { expensesToDefault, getExpenes, saveExpense } from '../store/entities/expenses';
import { getHarvests } from '../store/entities/harvests';
import { getHives, loadHives } from '../store/entities/hives';
import { getProducts } from '../store/entities/products';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { translate } from '../utils/utils';

function CreateHarvest() {
  const [amount, setAmount] = useState<"" | number>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string | number>(new Date().getTime());
  const [product, setProduct] = useState("");
  const [hive, setHive] = useState("");
  const products = useAppSelector(getProducts);
  const hives = useAppSelector(getHives);
  const harvests = useAppSelector(getHarvests);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadHives());
  }, []);
  useEffect(() => {
    if (products.list.length > 0) setProduct(products.list[0]._id);
    if (hives.list.length > 0) setHive(hives.list[0]._id);
  }, [products.list, hives.list]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveExpense(amount, description, date, hive));
  };
  const saveMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAmount("");
    setDescription("");
    setHive(products.list[0]?._id);
    setDate(new Date().getTime());
    dispatch(expensesToDefault());
  };
  if (products.state === "loading") return <Loading />;
  return (
    <main className="">
      <form className="exp-form form-secondary" onSubmit={handleSubmit}>
        <h1 className="form-title">{translate("nuevaCosecha")}</h1>
        {/* date */}
        <label htmlFor="date-in">{translate("fecha")}</label>
        <input
          type="date"
          name=""
          id="date-in"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {/* amount */}
        <label htmlFor="amount-in">{translate("cantidad")}</label>
        <input
          type="number"
          name=""
          id="amount-in"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        {/* product */}
        <label htmlFor="product-in">{translate("producto")}</label>

        <select
          name=""
          id="product-in"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          {products.list.map((prod) => (
            <option value={prod._id}>{prod.name}</option>
          ))}
        </select>
        {/* hive */}
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
        </select>
        {harvests.error && (
          <p className="err-msg">{translate(harvests.error)}</p>
        )}
        <button
          className="btn btn-primary mx-auto"
          onClick={harvests.state === "saved" ? saveMoreHandler : undefined}
        >
          {harvests.state === "saving" && <ButtonSpinner />}

          {harvests.state === "saved" ? (
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

export default CreateHarvest;
