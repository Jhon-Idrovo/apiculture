import { IHivesResponse } from '../store/entities/hives';
import { IUserResponse } from '../store/user/user';

// need to be sorted as they get sorted when loaded
export const expectedHivesResponse: IHivesResponse = {
  hives: [
    {
      _id: "614f96e5f956fb58518258ba",
      installationDate: "1970-01-01T00:26:40.000Z",
      name: "North",
      userID: "614f34b672c6f648d79961de",
      totalHarvests: 33,
      productionTotals: [
        {
          total: 11,
          product: "614f374972c6f648d79961f1",
        },
        {
          total: 22,
          product: "614f379372c6f648d79961f3",
        },
      ],
    },
    {
      _id: "614f42ba72c6f648d7996201",
      installationDate: "2021-09-25T15:39:32.917Z",
      name: "Easth",
      userID: "614f34b672c6f648d79961de",
      totalHarvests: 66,
      productionTotals: [
        {
          total: 21,
          product: "614f374972c6f648d79961f1",
        },
        {
          total: 21,
          product: "614f379372c6f648d79961f3",
        },
      ],
    },
  ],
};
export const expectedProductsReponse = {
  products: [
    {
      _id: "614f374972c6f648d79961f1",
      price: 12,
      name: "Honey",
      description: "Pure Honey",
      userID: "614f34b672c6f648d79961de",
      __v: 0,
    },
    {
      _id: "614f379372c6f648d79961f3",
      price: 5,
      name: "Propolis",
      description: "Propolis 50ml",
      userID: "614f34b672c6f648d79961de",
      __v: 0,
    },
  ],
};
export const expectedExpensesResponse = {
  expenses: [
    {
      _id: "61425c71c663d91d6207d700",
      description: "Test Expense",
      amount: 24,
      date: "1970-01-01T04:26:40.000Z",
      userID: "614146fff37ecf1a93e94eea",
    },
  ],
};

export const expectedSellsResponse = {
  sells: [
    {
      _id: "61425fa0c663d91d6207d703",
      productID: "6141fd66d697a31069be99b3",
      totalPrice: 50,
      totalAmount: 50,
      userID: "614146fff37ecf1a93e94eea",
    },
  ],
};
export const expectedUserResponse = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTQxNDZmZmYzN2VjZjFhOTNlOTRlZWEiLCJpYXQiOjE2MzE2Njc5NjcsImV4cCI6NTIzMTY2Nzk2N30.shTuR8CmWJxSJ6S-mpWkb8LI0uUcFaBxlzddh33fvjA",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTQxNDZmZmYzN2VjZjFhOTNlOTRlZWEiLCJpYXQiOjE2MzE2Njc5NjcsImV4cCI6NTIzMTY2Nzk2N30.shTuR8CmWJxSJ6S-mpWkb8LI0uUcFaBxlzddh33fvjA",
  user: "Jhon Doe",
} as IUserResponse;

export const expectedSignUpResponse = expectedUserResponse;
