import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { EXPENSES_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { loadExpenses } from '../store/entities/expenses';
import { expectedExpensesResponse } from '../utils/response_placeholders';

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
    expect(state.entities.expenses.list).toStrictEqual(
      expectedExpensesResponse.expenses
    );
  });
});
