import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import { loadHives } from '../store/entities/hives';
import { getProducts, productsToDefault, saveProduct } from '../store/entities/products';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { translate } from '../utils/utils';

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<"" | number>("");
  const [description, setDescription] = useState("");
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadHives());
    
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveProduct(name, price, description));
  };
  const saveMoreHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setName("");
    setPrice("");
    setDescription("");

    dispatch(productsToDefault());
  };
  return (
    <main className="">
      <form className="exp-form form-secondary" onSubmit={handleSubmit}>
        <h1 className="form-title">{translate("nuevoProducto")}</h1>
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
          {translate("precio")}
        </label>

        <input
          type="number"
          name=""
          id="date-in"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label htmlFor="desc-in">{translate("descripcion")}</label>
        <input
          type="text"
          name=""
          id="desc-in"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {products.error && (
          <p className="err-msg">{translate(products.error)}</p>
        )}
        <button
          className="btn btn-primary mx-auto"
          onClick={products.state === "saved" ? saveMoreHandler : undefined}
        >
          {products.state === "saving" && <ButtonSpinner />}

          {products.state === "saved" ? (
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

export default CreateProduct;
