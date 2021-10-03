import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { HIVES_ENDPOINT, PRODUCTS_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { IHive, loadHives } from '../store/entities/hives';
import { getProducts, loadProducts } from '../store/entities/products';
import { ISell } from '../store/entities/sells';
import { expectedHivesResponse, expectedProductsReponse } from '../utils/response_placeholders';
import { compareRows, getDonutDataByProduct } from '../utils/utils';

describe("Utils", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
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
  test("should parse hives'data to use on chart", async () => {
    fakeAxios.onGet(HIVES_ENDPOINT).reply(200, expectedHivesResponse);
    fakeAxios.onGet(PRODUCTS_ENDPOINT).reply(200, expectedProductsReponse);
    await store.dispatch(loadProducts());
    await store.dispatch(loadHives());
    const productID = getProducts(store.getState()).list[0]._id;
    const hives = expectedHivesResponse.hives;
    const data = getDonutDataByProduct(hives as unknown as IHive[], productID);
    console.log({ data });

    const expected = [
      {
        productId: "614f374972c6f648d79961f1",
        data: {
          labels: ["Easth", "North"],

          datasets: [
            {
              label: "Hives",
              data: [21, 11],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                // "rgb(255, 205, 86)",
              ],
              hoverOffset: 50,
            },
          ],
        },
      },
      {
        productId: "614f379372c6f648d79961f3",
        data: {
          labels: ["Easth", "North"],
          datasets: [
            {
              label: "Hives",
              data: [21, 22],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                // "rgb(255, 205, 86)",
              ],
              hoverOffset: 50,
            },
          ],
        },
      },
    ].find((a) => a.productId === productID)?.data;
    expect(data.labels).toStrictEqual(expected?.labels);
    expect(data.datasets[0].data).toStrictEqual(expected?.datasets[0].data);
  });
  // test("should parse the total production data from each hive and make it ready for display on a donut chart", () => {
  //   const hives = expectedHivesResponse.hives;
  //   const products = expectedProductsReponse.products;
  // });
});
