console.log({ NODE_ENV: process.env.NODE_ENV });

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v4"
    : "https://apiculture-326002.ue.r.appspot.com/api/v4";
// API ENDPOINTS
export const SIGNUP_ENDPOINT = "/auth/signup";
export const RELOAD_USER_ENDPOINT = "/auth/get-user";
export const LOGIN_ENDPOINT = "/auth/signin";
export const HIVES_ENDPOINT = "/hive";
export const HARVESTS_ENDPOINT = "/harvest";
export const PRODUCTS_ENDPOINT = "/product";
export const EXPENSES_ENDPOINT = "/expense";
export const SELLS_ENDPOINT = "/sell";
export const BUGS_CACHING_TIMEOUT = 5000;
export const ALBUMS_CACHING_TIMEOUT = 5000;
// CLIENT URLS
export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";
export const CREATE_PRODUCT_URL = "/create-product";
export const CREATE_EXPENSE_URL = "/create-expense";
export const CREATE_SELL_URL = "/create-sell";
export const CREATE_HIVE_URL = "/create-hive";
export const CREATE_HARVEST_URL = "/create-harvest";
