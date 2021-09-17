import { useEffect } from "react";
import Table from "../components/Table";
import {
  getExpenes,
  loadExpenses,
  sortExpenses,
} from "../store/entities/expenses";
import { useAppDispatch } from "../store/hooks/hooks";

function Expenses() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadExpenses());
  }, []);
  return (
    <div>
      <Table rowsSelector={getExpenes} rowsSort={sortExpenses} />
    </div>
  );
}

export default Expenses;
