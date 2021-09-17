import { useEffect } from "react";
import Table from "../components/Table";
import { getSells, loadSells, sortSells } from "../store/entities/sells";
import { useAppDispatch } from "../store/hooks/hooks";

function Sells() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSells());
  }, []);
  return (
    <div>
      <Table rowsSelector={getSells} rowsSort={sortSells}></Table>
    </div>
  );
}

export default Sells;
