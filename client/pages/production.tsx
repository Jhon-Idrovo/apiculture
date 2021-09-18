import { useEffect, useState } from "react";
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
  loadHives,
  sortHives,
} from "../store/entities/hives";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
/**
 * Hives and their production. Either individualized or total
 * @returns
 */
function Production() {
  const dispatch = useAppDispatch();
  let harvests = useAppSelector(getHarvests);
  let hives = useAppSelector(getHives);
  useEffect(() => {
    dispatch(loadHarvests());
    dispatch(loadHives());
  }, []);
  if (harvests.loading || hives.loading) return <Loading />;
  if (hives.list.length === 0) return <div>empty</div>;
  return (
    <div>
      <Donut />
      <div className="hives-container">
        {hives.list.map((hive) => (
          <div
            className="hive"
            onClick={() => dispatch(changeActiveHive(hive._id))}
          >
            <h2>{hive.name}</h2>
            <h2>{hive.installationDate}</h2>
          </div>
        ))}
        <div className="hive" onClick={() => dispatch(changeActiveHive(""))}>
          <h2>All Hives</h2>
        </div>
      </div>
      <Table rowsSelector={getHarvests} rowsSort={sortHarvests} />
    </div>
  );
}

export default Production;
