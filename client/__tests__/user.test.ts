import store from "../store/configureStore";
import { getUser, IUser, IUserResponse, logIn } from "../store/user/user";
import MockAdapter from "axios-mock-adapter";
import { LOGIN_ENDPOINT } from "../config/config";
import axiosInstance from "../config/axiosInstance";
import { verifyToken } from "../utils/utils";

const expectedUserResponse = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTQxNDZmZmYzN2VjZjFhOTNlOTRlZWEiLCJpYXQiOjE2MzE2Njc5NjcsImV4cCI6NTIzMTY2Nzk2N30.shTuR8CmWJxSJ6S-mpWkb8LI0uUcFaBxlzddh33fvjA",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTQxNDZmZmYzN2VjZjFhOTNlOTRlZWEiLCJpYXQiOjE2MzE2Njc5NjcsImV4cCI6NTIzMTY2Nzk2N30.shTuR8CmWJxSJ6S-mpWkb8LI0uUcFaBxlzddh33fvjA",
  name: "Jhon Doe",
} as IUserResponse;
// UNIT TESTS
describe("User", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should log in user", async () => {
    // change the HTTP method for real use
    fakeAxios.onPost(LOGIN_ENDPOINT).reply(200, expectedUserResponse);
    // log in is an async function
    await store.dispatch(logIn("TestEmail", "TestPassword"));
    const state = store.getState();
    const user = getUser(state);
    const r = verifyToken(expectedUserResponse.accessToken);
    expect(user).toStrictEqual({
      name: expectedUserResponse.name,
      id: r.userID,
      loading: false,
      error: "",
    } as IUser);
  });
  test("should log in user from token", () => {});
});

// // INTEGRATION TESTS
// describe("User", () => {
//   test("should log in user", async () => {
//     await store.dispatch(logIn("TestUser", "TestPassword"));
//     const state = store.getState();
//     const user = getUser(state);

//     expect(user.id).toBeTruthy();
//   });
// });

// describe("albums with user", () => {
//   test("should load albums", async () => {
//     await store.dispatch(loadAlbums());
//     const albums = getAlbums(store.getState());
//     console.log(albums);
//     expect(albums.list.length).toBeGreaterThan(0);
//   });
// });
