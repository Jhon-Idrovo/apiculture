import { useEffect, useState } from 'react';

import ButtonSpinner from '../components/ButtonSpinner';
import FSMessage from '../components/FSMessage';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {
    expensesKeyMapping, getExpenes, loadExpenses, saveExpense, sortExpenses
} from '../store/entities/expenses';
import { getHives } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/user/user';
import { translate } from '../utils/utils';

function Expenses() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const hives = useAppSelector(getHives);
  const expenses = useAppSelector(getExpenes);
  useEffect(() => {
    dispatch(loadExpenses());
  }, []);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [hive, setHive] = useState("");
  if (user.loading) return <Loading />;
  if (user.id === "")
    return (
      <FSMessage>
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
        {isNewOpen && (
          <div className="t-row">
            <div className="t-cell"></div>
            <div className="t-cell" style={{ maxWidth: "5vw" }}>
              <input
                type="number"
                name=""
                id="amount-in"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <input
                type="text"
                name=""
                id="desc-in"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <input
                type="date"
                name=""
                id="date-in"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="t-cell" style={{ maxWidth: "10vw" }}>
              <select
                name=""
                id="hive-in"
                value={hive}
                onChange={(e) => setHive(e.target.value)}
              >
                {hives.list.map((hive) => (
                  <option value={hive._id}>{hive.name}</option>
                ))}
                <option value="N/A">N/A</option>
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
          {translate("exp1")}
        </button>
      )}
      {isNewOpen && (
        <div className="flex w-full">
          <button
            className="btn btn-primary mx-auto"
            onClick={() =>
              //TODO: restart the fields on success
              dispatch(saveExpense(amount, description, date, hive))
            }
          >
            {expenses.state && <ButtonSpinner />}
            {translate("sv")}
          </button>
        </div>
      )}
    </main>
  );
}

export default Expenses;
