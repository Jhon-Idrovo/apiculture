import { useEffect } from "react";
import Table from "../components/Table";
import { getHives, loadHives, sortHives } from "../store/entities/hives";
import { useAppDispatch } from "../store/hooks/hooks";

function Hives() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadHives());
  }, []);
  return (
    <div>
      <Table rowsSelector={getHives} rowsSort={sortHives} />
    </div>
  );
}

export default Hives;
