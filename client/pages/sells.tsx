import { useEffect, useState } from "react";
import ButtonSpinner from "../components/ButtonSpinner";
import Table from "../components/Table";
import { getProducts, loadProducts } from "../store/entities/products";
import {
  getSells,
  loadSells,
  saveSell,
  sellsKeyMapping,
  sortSells,
} from "../store/entities/sells";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
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
  }, [products.loading]);
  return (
    <main>
      <Table
        rowsSelector={getSells}
        rowsSort={sortSells}
        mapping={sellsKeyMapping}
      >
        {isNewOpen && (
          <div className="t-row">
            <div className="t-cell"></div>
            <div className="t-cell">
              <input
                type="number"
                name=""
                id="amount-in"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="t-cell">
              <input
                type="number"
                name=""
                id="price-in"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="t-cell">
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
            <div className="t-cell">
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
          Add Harvest
        </button>
      )}
      {isNewOpen && (
        <div className="flex w-full">
          <button
            className="btn btn-primary mx-auto"
            onClick={() => dispatch(saveSell(amount, price, date, product))}
          >
            {sells.loading && <ButtonSpinner />}
            Save
          </button>
        </div>
      )}
    </main>
  );
}

export default Sells;
