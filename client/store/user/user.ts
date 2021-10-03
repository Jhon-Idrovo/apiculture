import axios, { AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';
import { LOGIN_ENDPOINT, RELOAD_USER_ENDPOINT, SIGNUP_ENDPOINT } from '../../config/config';
import { errorToMessage, verifyToken } from '../../utils/utils';
import { RootState } from '../configureStore';
import { AppThunk } from '../middleware/thunkMiddleware';

export declare interface IUser {
  name: string;
  id: string;
  loading?: boolean;
  error?: string;
}
/**
 * If errors occuer with type casting see:https://redux.js.org/tutorials/typescript-quick-start#define-slice-state-and-action-types
 */
export const userInitialState: IUser = {
  name: "",
  id: "",
  loading: false,
  error: "",
};
export declare interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  name: IUser["name"];
}
export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: userInitialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    userLoading: (state) => {
      state.loading = true;
    },
    userLogged: (state, action: PayloadAction<IUser>) => {
      (state.error = ""), (state.id = action.payload.id);
      state.name = action.payload.name;
      state.loading = false;
    },
    userLoggedOut: () => {
      //DELETE TOKENS AND AXIOS
      localStorage.removeItem("ss");
      localStorage.removeItem("rr");
      axiosInstance.defaults.headers.Authorization = "";
      return { ...userInitialState };
    },
    userLogInFailed: (user, action: PayloadAction<string>) => {
      user.error = action.payload;
      user.loading = false;
    },
    userSignUpFailed: (user, action: PayloadAction<string>) => {
      user.error = action.payload;
      user.loading = false;
    },
    userSignedUp: (
      user,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: IUser;
      }>
    ) => {
      const { user: reciviedUser, accessToken, refreshToken } = action.payload;
      user.name = reciviedUser.name;
      user.id = reciviedUser.id;
      localStorage.setItem("ss", accessToken);
      localStorage.setItem("rr", refreshToken);
      axiosInstance.defaults.headers.Authorization = `JWT ${accessToken}`;
      user.error = "";
      user.loading = false;
    },
  },
});

const {
  userLogged,
  userLoggedOut,
  userLoading,
  userLogInFailed,
  userSignUpFailed,
  userSignedUp,
} = userSlice.actions;
export default userSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
// automatically memoized

//SELECTORS
export const getUser = (state: RootState) => state.user;

// FUNCTION ACTIONS
export const reloadUserFromToken =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    console.log(state);

    if (state.user.id !== "") return;
    dispatch(userLoading());
    const token = localStorage.getItem("rr");
    if (!token) return dispatch(userLogInFailed(""));
    axiosInstance.defaults.headers.Authorization = `JWT ${token}`;
    try {
      const res = await axiosInstance.post(RELOAD_USER_ENDPOINT);
      const { _id, username } = res.data.user;
      localStorage.setItem("rr", res.data.refreshToken);
      dispatch(userLogged({ id: _id, name: username }));
    } catch (error) {
      console.log(error);

      dispatch(userLogInFailed(errorToMessage(error)));
    }
  };
export const logIn =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    // start the loading
    dispatch(userLoading());
    // call the api
    try {
      const res = await axiosInstance.post(LOGIN_ENDPOINT, { email, password });
      const { name, accessToken, refreshToken } = res.data as IUserResponse;
      localStorage.setItem("ss", accessToken);
      localStorage.setItem("rr", refreshToken);
      const r = verifyToken(accessToken);
      console.log(r);
      if (!r) throw new Error("Error verifying session, please log in again");
      const { userID } = r;
      axiosInstance.defaults.headers.Authorization = `JWT ${accessToken}`;
      // pass the error to override previous errors
      return dispatch(
        userLogged({ id: userID, name, error: "", loading: false })
      );
    } catch (error) {
      console.log(error);

      return dispatch(userLogInFailed(errorToMessage(error)));
    }
  };
export const logOut = () => userLoggedOut();

export const signUp =
  (email: string, password: string, username: string): AppThunk =>
  async (dispatch) => {
    dispatch(userLoading());

    try {
      if (!(email && password && username))
        throw new Error("llenaTodosLosCamposError");

      const { data }: { data: IUserResponse } = await axiosInstance.post(
        SIGNUP_ENDPOINT,
        {
          username,
          email,
          password,
        }
      );
      const tokenPayload = verifyToken(data.accessToken);
      dispatch(
        userSignedUp({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: { name: data.name, id: tokenPayload.userID },
        })
      );
    } catch (error) {
      dispatch(userSignUpFailed(errorToMessage(error)));
    }
  };
