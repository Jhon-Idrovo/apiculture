import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../config/axiosInstance";
import { HIVES_ENDPOINT } from "../config/config";
import store from "../store/configureStore";
import { IHivesResponse, loadHives } from "../store/entities/hives";

export const expectedHivesResponse: IHivesResponse = {
  hives: [
    {
      _id: "61420f0ca7de741446708fc9",
      installationDate: "1970-01-01T00:26:40.000Z",
      name: "Test Hive",
      userID: "614146fff37ecf1a93e94eea",
      totalHarvests: 20,
    },
    {
      _id: "61420f2ca7de741446708fc9",
      installationDate: "1970-01-01T00:26:40.000Z",
      name: "Test Hive 2",
      userID: "614146fff37ecf1a93e94eea",
      totalHarvests: 22,
    },
  ],
};
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
    console.log(state);

    // assert
    expect(state.entities.hives.list).toStrictEqual(
      expectedHivesResponse.hives
    );
  });
});
