import MockAdapter from "axios-mock-adapter/types";
import axiosInstance from "../config/axiosInstance";

describe("Hive", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should load all hives from server", async () => {
    fakeAxios.onGet();
  });
});
