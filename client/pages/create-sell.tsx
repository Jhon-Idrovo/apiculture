import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import Loading from '../components/Loading';
import { expensesToDefault, getExpenes, saveExpense } from '../store/entities/expenses';
import { getHives, loadHives } from '../store/entities/hives';
import { getProducts, loadProducts } from '../store/entities/products';
import { getSells, saveSell } from '../store/entities/sells';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { translate } from '../utils/utils';

function CreateSell() {
  const [amount, setAmount] = useState<"" | number>("");
  const [price, setPrice] = useState<"" | number>("");
  const [date, setDate] = useState<string | number>(new Date().getTime());
  const [product, setProduct] = useState("");
  const products = useAppSelector(getProducts);
  const sells = useAppSelector(getSells);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, []);
  useEffect(() => {
    if (products.list.length > 0) setProduct(products.list[0]._id);
  }, [products.list]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveSell(amount, price, date, product));
  };
  const saveMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPrice("");
    setProduct("");
    setAmount("");
    setDate(new Date().getTime());
    dispatch(expensesToDefault());
  };
  if (products.state === "loading") return <Loading />;
  return (
    <main className="">
      <form className="exp-form form-secondary" onSubmit={handleSubmit}>
        <h1 className="form-title">{translate("nuevaVenta")}</h1>
        <label htmlFor="amount-in">{translate("cantidad")}</label>
        <input
          type="number"
          name=""
          id="amount-in"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <label htmlFor="price-in">{translate("precio")}</label>
        <input
          type="number"
          name=""
          id="price-in"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label htmlFor="hive-in">{translate("producto")}</label>

        <select
          name=""
          id="hive-in"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          {products.list.map((product, i) => (
            <option key={i} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <label htmlFor="date-in">{translate("fecha")}</label>

        <input
          type="date"
          name=""
          id="date-in"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {sells.error && <p className="err-msg">{translate(sells.error)}</p>}
        <button
          className="btn btn-primary mx-auto"
          onClick={sells.state === "saved" ? saveMoreHandler : undefined}
        >
          {sells.state === "saving" && <ButtonSpinner />}

          {sells.state === "saved" ? (
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

export default CreateSell;
