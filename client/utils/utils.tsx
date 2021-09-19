import axios, { AxiosError } from "axios";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { IExpense } from "../store/entities/expenses";
import { IHarvest, IHive } from "../store/entities/hives";
import { ISell } from "../store/entities/sells";
export declare type RoleName = "Admin" | "User" | "Guest";
//for the payload being sent into the token
export declare interface TokenPayloadInterface extends JwtPayload {
  userID: string;
  role: RoleName;
}

export function verifyToken(token: string) {
  //   try {
  //     const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET as Secret);
  //     return payload as TokenPayloadInterface;
  //   } catch (error) {
  //     return false;
  //   }
  const tokenParts = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return tokenParts as TokenPayloadInterface;
}
export function errorToMessage(error: unknown) {
  return (
    axios.isAxiosError(error)
      ? (error as AxiosError).response?.data.error.message
      : (error as Error).message
  ) as string;
}

export declare type Order = "asc" | "desc";
/**
 * Sorts the array of data. It modfifies the initial array.
 * @param rows
 * @param l
 * @param r last index of the rows
 * @param sortBy key of rows
 * @param order
 * @returns
 */
export function rowsMergeSort<T>(
  rows: T[],
  l: number,
  r: number,
  sortBy: keyof T,
  order: Order
) {
  //T is the type of one row, not the list of them
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  rowsMergeSort(rows, l, m, sortBy, order);
  rowsMergeSort(rows, m + 1, r, sortBy, order);
  merge<T>(rows, l, m, r, sortBy, order);
}
function merge<T>(
  arr: T[],
  l: number,
  m: number,
  r: number,
  orderBy: keyof T,
  order: Order
) {
  const lengthL = m - l + 1;
  const lengthR = r - m;

  let L = Array(lengthL);
  let R = Array(lengthR);
  //temp arrays
  for (let i = 0; i < lengthL; i++) {
    L[i] = arr[l + i];
  }
  for (let i = 0; i < lengthR; i++) {
    R[i] = arr[m + 1 + i];
  }

  //merging temp arrays back to the orinignal one
  let lIndex, rIndex;
  lIndex = rIndex = 0;
  let arrIndex = 0;
  while (lIndex < lengthL && rIndex < lengthR) {
    //compare the rows
    //orderBy is a key and L[lindex] is an object

    //descendent order
    if (order === "asc") {
      if (L[lIndex][orderBy] <= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
    }
    //ascendent order
    if (order === "desc") {
      if (L[lIndex][orderBy] >= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
    }
    arrIndex++;
  }
  //copying the remaining elements of R or L, if any
  while (lIndex < lengthL) {
    arr[arrIndex] = L[lIndex];
    lIndex++;
    arrIndex++;
  }
  while (rIndex < lengthR) {
    arr[arrIndex] = R[rIndex];
    rIndex++;
    arrIndex++;
  }
}

export function compareRows<T>(orderBy: keyof T, order: Order) {
  return (rowA: T, rowB: T) => {
    // if the property doesn't exist in either row
    if (
      !(rowA as Object).hasOwnProperty(orderBy) ||
      !(rowB as Object).hasOwnProperty(orderBy)
    )
      return 0;
    //extract values to compare. Uppercase the strings to do not take into account it
    const valA =
      typeof rowA[orderBy] === "string"
        ? (rowA[orderBy] as unknown as string).toUpperCase()
        : rowA[orderBy];
    const valB =
      typeof rowB[orderBy] === "string"
        ? (rowB[orderBy] as unknown as string).toUpperCase()
        : rowB[orderBy];

    //run the comparission
    let comparission = 0; //default case valA = valB
    valA > valB ? (comparission = 1) : (comparission = -1);
    //order transformation, if neccesary
    return order === "desc" ? comparission * -1 : comparission;
  };
}
export const getDonutData = (hives: IHive[]) => {
  let res = {
    labels: [] as string[], //push name of the hive here
    datasets: [
      {
        label: "Hives",
        data: [] as number[], //push values here
        // TODO: generate random colors
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          // "rgb(255, 205, 86)",
        ],
        hoverOffset: 10,
      },
    ],
  };
  hives.map((hive) => {
    res.labels.push(hive.name);
    res.datasets[0].data.push(hive.totalHarvests);
  });
  return res;
};
