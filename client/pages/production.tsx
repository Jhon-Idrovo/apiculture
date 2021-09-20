import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Table from "../components/Table";
import Donut from "../components/Donut";
import {
  getHarvests,
  harvestKeyssMapping,
  loadHarvests,
  saveHarvest,
  sortHarvests,
} from "../store/entities/harvests";
import { changeActiveHive, getHives, loadHives } from "../store/entities/hives";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getDonutData } from "../utils/utils";
import { getProducts, loadProducts } from "../store/entities/products";
import { getUser } from "../store/user/user";
import FSMessage from "../components/FSMessage";
import ButtonSpinner from "../components/ButtonSpinner";
/**
 * Hives and their production. Either individualized or total
 * @returns
 */
function Production() {
  const dispatch = useAppDispatch();
  let harvests = useAppSelector(getHarvests);
  let hives = useAppSelector(getHives);
  const products = useAppSelector(getProducts);
  const user = useAppSelector(getUser);
  const [isNewOpen, setIsNewOpen] = useState(false);
  useEffect(() => {
    dispatch(loadHarvests());
    dispatch(loadProducts());
    dispatch(loadHives());
  }, []);
  const [date, setDate] = useState(new Date().toDateString());
  const [amount, setAmount] = useState(0);
  const [productID, setProductID] = useState("");
  const [hiveID, setHiveID] = useState("");
  useEffect(() => {
    if (hives.list.length > 0) setHiveID(hives.list[0]._id);
  }, [hives]);
  useEffect(() => {
    if (products.list.length > 0) setProductID(products.list[0]._id);
  }, [products]);
  //const donutData = useMemo(() => getDonutData(hives.list), hives.list);
  if (user.id === "") return <FSMessage>test</FSMessage>;
  if (harvests.loading || hives.loading || products.loading) return <Loading />;
  return (
    <main>
      <Donut
        data={getDonutData(hives.list)}
        onClickHandler={(event, elements, chart) => {
          console.log(elements[0].index);
          // dispatch(
          //   changeActiveHive((hives.list[elements[0].index] as IHive)._id)
          // );
        }}
      />
      <div className="hives-container">
        {hives.list.map((hive) => (
          <div
            className={`hive ${
              hives.activeHiveID === hive._id && "active-hive"
            }`}
            onClick={() => dispatch(changeActiveHive(hive._id))}
          >
            <h2>{hive.name}</h2>
            <h2>{new Date(hive.installationDate).toLocaleDateString()}</h2>
          </div>
        ))}
        <div
          className={`hive ${hives.activeHiveID === "" && "active-hive"}`}
          onClick={() => dispatch(changeActiveHive(""))}
        >
          <h2>All Hives</h2>
        </div>
      </div>
      <Table
        rowsSelector={getHarvests}
        rowsSort={sortHarvests}
        mapping={harvestKeyssMapping}
      >
        {isNewOpen && (
          <div className="row-create t-row">
            <div className="t-cell"></div>
            {/* date */}
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <input
                type="date"
                name=""
                id="date-in"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {/* amount */}
            <div className="t-cell" style={{ maxWidth: "5vw" }}>
              <input
                type="number"
                name=""
                id="amount-in"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            {/* product */}
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <select
                name=""
                id="product-in"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              >
                {products.list.map((prod) => (
                  <option value={prod._id}>{prod.name}</option>
                ))}
              </select>
            </div>
            {/* hive */}
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <select
                name=""
                id="hive-in"
                value={hiveID}
                onChange={(e) => setHiveID(e.target.value)}
              >
                {hives.list.map((hive) => (
                  <option value={hive._id}>{hive.name}</option>
                ))}
              </select>
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
            onClick={() =>
              dispatch(saveHarvest(amount, date, productID, hiveID))
            }
          >
            {harvests.loading && <ButtonSpinner />}
            Save
          </button>
        </div>
      )}
    </main>
  );
}

export default Production;
