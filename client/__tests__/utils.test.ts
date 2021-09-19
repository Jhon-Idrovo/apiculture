import store from "../store/configureStore";
import { getHives, IHive } from "../store/entities/hives";
import { ISell } from "../store/entities/sells";
import { compareRows, getDonutData } from "../utils/utils";
import { expectedHivesResponse } from "./hives.test";

describe("Utils", () => {
  test("should sort the list of objects", () => {
    const rows = [
      {
        _id: "61425fa0c663d91d6207d703",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 50,
        totalAmount: 50,
      },

      {
        _id: "6143eca37212d02908e88f6d",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 6,
        totalAmount: 1,
      },
      {
        _id: "6143ecab7212d02908e88f6f",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 12,
        totalAmount: 2,
      },
      {
        _id: "6143ecb87212d02908e88f73",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 15,
        totalAmount: 2.5,
      },
      {
        _id: "6143ecc67212d02908e88f75",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 20,
        totalAmount: 3,
      },
    ] as unknown as ISell[];

    // rowsMergeSort(rows, 0, rows.length - 1, "totalAmount", "asc");
    rows.sort(compareRows<ISell>("totalAmount", "asc"));
    console.log(rows);

    expect(rows).toStrictEqual([
      {
        _id: "6143eca37212d02908e88f6d",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 6,
        totalAmount: 1,
      },
      {
        _id: "6143ecab7212d02908e88f6f",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 12,
        totalAmount: 2,
      },
      {
        _id: "6143ecb87212d02908e88f73",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 15,
        totalAmount: 2.5,
      },
      {
        _id: "6143ecc67212d02908e88f75",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 20,
        totalAmount: 3,
      },
      {
        _id: "61425fa0c663d91d6207d703",
        productID: "6141fd66d697a31069be99b3",
        totalPrice: 50,
        totalAmount: 50,
      },
    ]);
  });
  test("should parse hives'data to use on chart", () => {
    const hives = expectedHivesResponse.hives;
    const data = getDonutData(hives as unknown as IHive[]);
    const expected = {
      labels: ["Test Hive", "Test Hive 2"],

      datasets: [
        {
          label: "Hives",
          data: [20, 22],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            // "rgb(255, 205, 86)",
          ],
          hoverOffset: 50,
        },
      ],
    };
    expect(data.labels).toStrictEqual(expected.labels);
    expect(data.datasets[0].data).toStrictEqual(expected.datasets[0].data);
  });
});
