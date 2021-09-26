import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../config/axiosInstance';
import { PRODUCTS_ENDPOINT } from '../config/config';
import store from '../store/configureStore';
import { getProductById, loadProducts } from '../store/entities/products';
import { expectedProductsReponse } from './response_placeholders';

describe("Products", () => {
  let fakeAxios: MockAdapter;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axiosInstance);
  });
  test("should return the requested product by id", async () => {
    fakeAxios.onGet(PRODUCTS_ENDPOINT).reply(200, expectedProductsReponse);
    await store.dispatch(loadProducts());
    const id = expectedProductsReponse.products[0]._id;
    const res = getProductById(id);
    expect(res).toStrictEqual(expectedProductsReponse.products[0]);
  });
});
