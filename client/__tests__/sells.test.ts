import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { SELLS_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { loadSells, sortSells } from '../store/entities/sells';
import { expectedSellsResponse } from '../utils/response_placeholders';

describe("Sells", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should load all expenses", async () => {
    fakeAxios.onGet(SELLS_ENDPOINT).reply(200, expectedSellsResponse);
    // is an async function
    await store.dispatch(loadSells());
    const state = store.getState();
    expect(state.entities.sells.list).toStrictEqual(
      expectedSellsResponse.sells
    );
  });
  test("should sort the rows", () => {
    store.dispatch(sortSells("_id"));
  });
});
