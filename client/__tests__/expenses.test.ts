import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../config/axiosInstance";
import { EXPENSES_ENDPOINT } from "../config/config";
import store from "../store/configureStore";
import { loadExpenses } from "../store/entities/expenses";

const expectedExpensesResponse = {
  expenses: [
    {
      _id: "61425c71c663d91d6207d700",
      description: "Test Expense",
      amount: 24,
      date: "1970-01-01T04:26:40.000Z",
      userID: "614146fff37ecf1a93e94eea",
    },
  ],
};
describe("Expenses", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should load all expenses", async () => {
    fakeAxios.onGet(EXPENSES_ENDPOINT).reply(200, expectedExpensesResponse);
    // is an async function
    await store.dispatch(loadExpenses());
    const state = store.getState();
    expect(state.entities.expenses).toStrictEqual({
      loading: false,
      error: "",
      expensesList: expectedExpensesResponse.expenses,
    });
  });
});
