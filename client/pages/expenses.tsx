import { useEffect } from 'react';

import FSMessage from '../components/FSMessage';
import Loading from '../components/Loading';
import LogingNeeded from '../components/LogingNeeded';
import Table from '../components/Table';
import {
    expensesKeyMapping, getExpenes, loadExpenses, sortExpenses
} from '../store/entities/expenses';
import { getHives } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/user/user';

function Expenses() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const hives = useAppSelector(getHives);
  const expenses = useAppSelector(getExpenes);
  useEffect(() => {
    dispatch(loadExpenses());
  }, []);
  if (user.loading || expenses.state === "loading" || hives.state === "loading")
    return <Loading />;
  if (user.id === "") return <LogingNeeded />;
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
