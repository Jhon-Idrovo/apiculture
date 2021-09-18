export declare interface IHive {
  userID: string;
  name: string;
  installationDate: number;
  harvests?: IHarvest[];
}
export declare interface IHarvest {
  date: number;
  amount: number;
  product: string;
}
