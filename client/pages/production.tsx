import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import Table from "../components/Table";
import Donut from "../components/Donut";
import {
  getHarvests,
  loadHarvests,
  sortHarvests,
} from "../store/entities/harvests";
import {
  changeActiveHive,
  getHives,
  IHive,
  loadHives,
  sortHives,
} from "../store/entities/hives";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getDonutData } from "../utils/utils";
import { loadProducts } from "../store/entities/products";
import { getUser } from "../store/user/user";
import FSMessage from "../components/FSMessage";
/**
 * Hives and their production. Either individualized or total
 * @returns
 */
function Production() {
  const dispatch = useAppDispatch();
  let harvests = useAppSelector(getHarvests);
  let hives = useAppSelector(getHives);
  const user = useAppSelector(getUser);
  const [isNewOpen, setIsNewOpen] = useState(false);
  useEffect(() => {
    dispatch(loadHarvests());
    dispatch(loadProducts());
    dispatch(loadHives());
  }, []);
  //const donutData = useMemo(() => getDonutData(hives.list), hives.list);
  if (user.id === "") return <FSMessage>test</FSMessage>;
  if (harvests.loading || hives.loading) return <Loading />;
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
      <Table rowsSelector={getHarvests} rowsSort={sortHarvests} />
      <div className="row-create t-row">
        {/* date */}
        <input type="date" name="" id="date-in" className="t-cell" />
        {/* amount */}
        <input type="number" name="" id="amount-in" className="t-cell" />
        {/* product */}
        <select name="" id="product"></select>
        {/* hive */}
      </div>
      <button
        className="btn btn-primary table mx-auto"
        onClick={() => setIsNewOpen((prev) => !prev)}
      >
        Add Harvest
      </button>
    </main>
  );
}

export default Production;
