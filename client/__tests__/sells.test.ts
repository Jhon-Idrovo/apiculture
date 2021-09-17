import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../config/axiosInstance";
import { SELLS_ENDPOINT } from "../config/config";
import store from "../store/configureStore";
import { loadExpenses } from "../store/entities/expenses";
import { loadSells, sortSells } from "../store/entities/sells";

const expectedResponse = {
  sells: [
    {
      _id: "61425fa0c663d91d6207d703",
      productID: "6141fd66d697a31069be99b3",
      totalPrice: 50,
      totalAmount: 50,
      userID: "614146fff37ecf1a93e94eea",
    },
  ],
};
describe("Sells", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should load all expenses", async () => {
    fakeAxios.onGet(SELLS_ENDPOINT).reply(200, expectedResponse);
    // is an async function
    await store.dispatch(loadSells());
    const state = store.getState();
    expect(state.entities.sells).toStrictEqual({
      fields: Object.keys(expectedResponse.sells[0]),
      sortBy: "",
      order: "asc",
      loading: false,
      error: "",
      list: expectedResponse.sells,
    });
  });
  test("should sort the rows", () => {
    store.dispatch(sortSells("_id"));
  });
});
