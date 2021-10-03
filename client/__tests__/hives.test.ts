import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { HIVES_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { loadHives } from '../store/entities/hives';
import { expectedHivesResponse } from '../utils/response_placeholders';

describe("Hive", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should load all hives from server", async () => {
    fakeAxios.onGet(HIVES_ENDPOINT).reply(200, expectedHivesResponse);
    // dispatch the load hives
    await store.dispatch(loadHives());
    // get the hives state
    const state = store.getState();

    // assert
    expect(state.entities.hives.list).toStrictEqual(
      expectedHivesResponse.hives
    );
  });
});
