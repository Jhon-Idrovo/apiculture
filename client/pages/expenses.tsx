import { useEffect } from "react";
import FSMessage from "../components/FSMessage";
import Table from "../components/Table";
import {
  expensesKeyMapping,
  getExpenes,
  loadExpenses,
  sortExpenses,
} from "../store/entities/expenses";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getUser } from "../store/user/user";

function Expenses() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  useEffect(() => {
    dispatch(loadExpenses());
  }, []);
  if (user.id === "")
    return (
      <FSMessage>
        {" "}
        <p>You're not logged in</p>
      </FSMessage>
    );
  return (
    <main>
      <Table
        rowsSelector={getExpenes}
        rowsSort={sortExpenses}
        mapping={expensesKeyMapping}
      >
        {null}
      </Table>
    </main>
  );
}

export default Expenses;
