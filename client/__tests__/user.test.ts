import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { getUser, IUser, logIn, signUp } from '../store/user/user';
import { expectedSignUpResponse, expectedUserResponse } from '../utils/response_placeholders';
import { verifyToken } from '../utils/utils';

// UNIT TESTS
describe("User", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should log in user", async () => {
    fakeAxios.onPost(LOGIN_ENDPOINT).reply(200, expectedUserResponse);
    // log in is an async function
    await store.dispatch(logIn("TestEmail", "TestPassword"));
    const state = store.getState();
    const user = getUser(state);
    const r = verifyToken(expectedUserResponse.accessToken);
    expect(user).toStrictEqual({
      name: expectedUserResponse.user,
      id: r.userID,
      loading: false,
      error: "",
    } as IUser);
  });
  test("should signUp user", async () => {
    fakeAxios.onPost(SIGNUP_ENDPOINT).reply(201, expectedSignUpResponse);
    await store.dispatch(signUp("test", "test", "test"));
    const state = store.getState();
    const user = getUser(state);
    const ss = localStorage.getItem("ss");
    const rr = localStorage.getItem("rr");
    expect(user).toStrictEqual({
      name: expectedSignUpResponse.user,
      id: verifyToken(expectedSignUpResponse.accessToken).userID,
      loading: false,
      error: "",
    } as IUser);
    expect(ss).toBe(expectedSignUpResponse.accessToken);
    expect(rr).toBe(expectedSignUpResponse.refreshToken);
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
