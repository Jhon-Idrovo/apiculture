export declare interface IProductionTotal {
  product: string;
  total: number;
}
export declare interface IHive {
  userID: string;
  name: string;
  installationDate: number;
  totalHarvests: number;
  productionTotals: IProductionTotal[];
}
export declare interface IResponseHive extends IHive {}
