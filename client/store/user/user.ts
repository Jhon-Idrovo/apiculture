import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import axiosInstance from "../../config/axiosInstance";
import { LOGIN_ENDPOINT } from "../../config/config";
import { verifyToken } from "../../utils/utils";
import { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";

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
      // state.loading = false;
      return { ...action.payload };
    },
    userLoggedOut: () => {
      return { ...userInitialState };
    },
    userLogInFailed: (user, action: PayloadAction<string>) => {
      user.error = action.payload;
      user.loading = false;
    },
  },
});

const { userLogged, userLoggedOut, userLoading, userLogInFailed } =
  userSlice.actions;
export default userSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
// automatically memoized

//SELECTORS
export const getUser = (state: RootState) => state.user;

// FUNCTION ACTIONS
export const logIn =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    console.log(email, password);

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
      axiosInstance.defaults.headers = { Authorization: `JWT ${accessToken}` };
      // pass the error to override previous errors
      return dispatch(
        userLogged({ id: userID, name, error: "", loading: false })
      );
    } catch (error) {
      return dispatch(
        userLogInFailed(
          axios.isAxiosError(error)
            ? (error as AxiosError).response?.data.error.message
            : (error as Error).message
        )
      );
    }
  };
export const logOut = () => userLoggedOut();
