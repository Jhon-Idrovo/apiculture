import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Table from "../components/Table";
import hives, {
  changeActiveHive,
  getHives,
  getProductionFromHive,
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
  let hives = useAppSelector(getHives);
  useEffect(() => {
    dispatch(loadHives());
  }, []);
  if (hives.loading) return <Loading />;
  if (hives.list.length === 0) return <div>empty</div>;
  return (
    <div>
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
      </div>
      <Table
        rowsSelector={getProductionFromHive(hives.activeHiveID)}
        rowsSort={sortHives}
      />
    </div>
  );
}

export default Production;
