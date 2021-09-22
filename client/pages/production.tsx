import { useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import Donut from '../components/Donut';
import Loading from '../components/Loading';
import LogingNeeded from '../components/LogingNeeded';
import Table from '../components/Table';
import {
    getHarvests, harvestKeyssMapping, loadHarvests, saveHarvest, sortHarvests
} from '../store/entities/harvests';
import { changeActiveHive, getHives, loadHives, saveHive } from '../store/entities/hives';
import { getProducts, loadProducts } from '../store/entities/products';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/user/user';
import { getDonutData, translate } from '../utils/utils';

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
  const [isNewHiveOpen, setIsNewHiveOpen] = useState(false);
  const [hiveName, setHiveName] = useState("");
  const [hiveDate, setHiveDate] = useState<string | number>(
    new Date().getTime()
  );
  if (user.id === "") return <LogingNeeded />;
  if (harvests.loading || hives.loading || products.loading) return <Loading />;
  return (
    <main>
      <Donut
        data={getDonutData(hives.list)}
        onClickHandler={() => {
          //console.log(elements[0].index);
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
          <h2>{translate("colmenasTodas")}</h2>
        </div>
      </div>
      {isNewHiveOpen && (
        <div className="new-in-form">
          <label htmlFor="name-in" id="name-in-label">
            {translate("nombre")}
          </label>
          <input
            type="text"
            name=""
            id="name-in"
            value={hiveName}
            onChange={(e) => setHiveName(e.target.value)}
          />
          <label htmlFor="date-in" id="date-in-label">
            {translate("fecha")}
          </label>

          <input
            type="date"
            name=""
            id="date-in"
            value={hiveDate}
            onChange={(e) => setHiveDate(e.target.value)}
          />
        </div>
      )}
      <button
        className="btn btn-accent-primary mx-auto"
        onClick={
          isNewHiveOpen
            ? () => dispatch(saveHive(hiveName, hiveDate))
            : () => setIsNewHiveOpen(true)
        }
      >
        {translate(isNewHiveOpen ? "sv" : "grdrColmena")}
      </button>
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
          className="btn btn-accent-primary table mx-auto"
          onClick={() => setIsNewOpen((prev) => !prev)}
        >
          {translate("grdrCosecha")}
        </button>
      )}
      {isNewOpen && (
        <div className="flex w-full">
          <button
            className="btn btn-accent-primary mx-auto"
            onClick={() =>
              dispatch(saveHarvest(amount, date, productID, hiveID))
            }
          >
            {harvests.loading && <ButtonSpinner />}
            {translate("sv")}
          </button>
        </div>
      )}
    </main>
  );
}

export default Production;

// To avoid error with react-intl
export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
