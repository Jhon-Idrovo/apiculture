import { ISell } from "../store/entities/sells";
import { compareRows, rowsMergeSort } from "../utils/utils";

describe("Utils", () => {
  test("should sort the list of objects", () => {
    const rows = [
      {
        _id: "61425fa0c663d91d6207d703",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 50,
        totalAmount: 50,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },

      {
        _id: "6143eca37212d02908e88f6d",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 6,
        totalAmount: 1,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecab7212d02908e88f6f",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 12,
        totalAmount: 2,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecb87212d02908e88f73",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 15,
        totalAmount: 2.5,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecc67212d02908e88f75",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 20,
        totalAmount: 3,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
    ];

    // rowsMergeSort(rows, 0, rows.length - 1, "totalAmount", "asc");
    rows.sort(compareRows<ISell>("totalAmount", "asc"));
    console.log(rows);

    expect(rows).toStrictEqual([
      {
        _id: "6143eca37212d02908e88f6d",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 6,
        totalAmount: 1,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecab7212d02908e88f6f",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 12,
        totalAmount: 2,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecb87212d02908e88f73",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 15,
        totalAmount: 2.5,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "6143ecc67212d02908e88f75",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 20,
        totalAmount: 3,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
      {
        _id: "61425fa0c663d91d6207d703",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 50,
        totalAmount: 50,
        userID: "614146fff37ecf1a93e94eea",
        __v: 0,
      },
    ]);
  });
});
