import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { LOGIN_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { getUser, IUser, logIn } from '../store/user/user';
import { verifyToken } from '../utils/utils';
import { expectedUserResponse } from './response_placeholders';

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
