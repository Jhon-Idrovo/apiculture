import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
    CREATE_EXPENSE_URL, CREATE_HARVEST_URL, CREATE_HIVE_URL, CREATE_PRODUCT_URL, CREATE_SELL_URL
} from '../config/config';
import { useAppDispatch } from '../store/hooks/hooks';
import { reloadUserFromToken } from '../store/user/user';
import { translate } from '../utils/utils';

function NavBar() {
  const router = useRouter();
  // const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // recover user from token
    dispatch(reloadUserFromToken());
  }, []);
  const [navSide, setNavSide] = useState<"" | "left" | "right">("");
  return (
    <nav
      className={`nav-bar ${
        navSide && (navSide === "left" ? "nav-left" : "nav-right")
      }`}
    >
      <Link href="/">
        <a className="nav-logo">Logo</a>
      </Link>
      <hr />

      <ul
        className={`left-list ${
          navSide
            ? navSide === "left"
              ? "list-active"
              : "list-hidden"
            : "list-standby"
        }`}
      >
        <li
          className="left-header"
          onClick={() => setNavSide((prev) => (prev === "left" ? "" : "left"))}
        >
          {translate("panel")}
        </li>
        <li className={`${router.pathname === "/sells" && "list-el-active"}`}>
          <Link href="/sells">
            <a>{translate("nv1")}</a>
          </Link>
        </li>
        <li
          className={`${router.pathname === "/expenses" && "list-el-active"}`}
        >
          <Link href="/expenses">
            <a>{translate("nv2")}</a>
          </Link>
        </li>
        <li
          className={`${router.pathname === "/production" && "list-el-active"}`}
        >
          <Link href="/production">
            <a>{translate("nv3")}</a>
          </Link>
        </li>
      </ul>
      <ul
        className={`right-list ${
          navSide
            ? navSide === "right"
              ? "list-active"
              : "list-hidden"
            : "list-standby"
        }`}
      >
        <li
          className="right-header"
          onClick={() =>
            setNavSide((prev) => (prev === "right" ? "" : "right"))
          }
        >
          {translate("anadir")}
        </li>
        <li
          className={`${
            router.pathname === CREATE_PRODUCT_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_PRODUCT_URL}>
            <a>{translate("nv4")}</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === CREATE_EXPENSE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_EXPENSE_URL}>
            <a>{translate("nv5")}</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === CREATE_SELL_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_SELL_URL}>
            <a>{translate("nv6")}</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === CREATE_HIVE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_HIVE_URL}>
            <a>{translate("nv7")}</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === CREATE_HARVEST_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_HARVEST_URL}>
            <a>{translate("nv8")}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
