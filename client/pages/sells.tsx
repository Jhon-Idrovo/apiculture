import { useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import Loading from '../components/Loading';
import Table from '../components/Table';
import { getProducts, loadProducts, saveProduct } from '../store/entities/products';
import { getSells, loadSells, saveSell, sellsKeyMapping, sortSells } from '../store/entities/sells';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { translate } from '../utils/utils';

/**
 * Products and their sales. Either individualized or the total
 * @returns
 */
function Sells() {
  const dispatch = useAppDispatch();
  const sells = useAppSelector(getSells);
  const products = useAppSelector(getProducts);
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadSells());
  }, []);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [amount, setAmount] = useState<"" | number>("");
  const [date, setDate] = useState<string | number>(new Date().getTime());
  const [price, setPrice] = useState<"" | number>("");
  const [product, setProduct] = useState<"" | string>("");
  useEffect(() => {
    if (products.list.length > 0) setProduct(products.list[0]._id);
  }, [products.state]);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [productPrice, setProductPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  if (products.state || sells.state) return <Loading />;
  return (
    <main>
      {isNewProductOpen && (
        <div className="new-in-form">
          <label htmlFor="name-in" id="name-in-label">
            {translate("nombre")}
          </label>
          <input
            type="text"
            name=""
            id="name-in"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="date-in" id="date-in-label">
            {translate("precio")}
          </label>

          <input
            type="number"
            name=""
            id="date-in"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
          />
          <label htmlFor="desc-in">{translate("descripcion")}</label>
          <input
            type="text"
            name=""
            id="desc-in"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
      )}
      <button
        className="btn btn-accent-primary mx-auto"
        onClick={
          isNewProductOpen
            ? () =>
                dispatch(
                  saveProduct(productName, productPrice, productDescription)
                )
            : () => setIsNewProductOpen(true)
        }
      >
        {translate(isNewProductOpen ? "sv" : "grdrProducto")}
      </button>
      <Table
        rowsSelector={getSells}
        rowsSort={sortSells}
        mapping={sellsKeyMapping}
      >
        {isNewOpen && (
          <div className="t-row">
            <div className="t-cell"></div>
            <div className="t-cell" style={{ maxWidth: "5vw" }}>
              <input
                type="number"
                name=""
                id="amount-in"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="t-cell" style={{ maxWidth: "5vw" }}>
              <input
                type="number"
                name=""
                id="price-in"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <select
                name=""
                id="hive-in"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.list.map((product) => (
                  <option value={product._id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <input
                type="date"
                name=""
                id="date-in"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </Table>
      {!isNewOpen && (
        <button
          className="btn btn-primary table mx-auto"
          onClick={() => setIsNewOpen((prev) => !prev)}
        >
          {translate("grdrVenta")}
        </button>
      )}
      {isNewOpen && (
        <div className="flex w-full">
          <button
            className="btn btn-primary mx-auto"
            onClick={() => dispatch(saveSell(amount, price, date, product))}
          >
            {sells.state && <ButtonSpinner />}
            {translate("sv")}
          </button>
        </div>
      )}
    </main>
  );
}

export default Sells;
