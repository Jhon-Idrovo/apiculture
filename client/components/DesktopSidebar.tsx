import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
    CREATE_EXPENSE_URL, CREATE_HARVEST_URL, CREATE_HIVE_URL, CREATE_PRODUCT_URL, CREATE_SELL_URL
} from '../config/config';
import { translate } from '../utils/utils';

function DesktopSidebar() {
  const router = useRouter();
  return (
    <nav
      id="desktop-nav"
      className="fixed my-2 left-0 top-0 bottom-0 w-32 bg-primary text-txt-primary m-0 mr-2 rounded-md overflow-x-hidden"
    >
      {/* <Link href="/">
        <a className=""></a>
      </Link> */}

      <ul className="desktop-nav_list mb-4">
        <li className="dashboard-header nav_header">{translate("panel")}</li>
        <li
          className={`list_element ${
            router.pathname === "/sells" && "list-el-active"
          }`}
        >
          <Link href="/sells">
            <a>{translate("nv1")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === "/expenses" && "list-el-active"
          }`}
        >
          <Link href="/expenses">
            <a>{translate("nv2")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === "/production" && "list-el-active"
          }`}
        >
          <Link href="/production">
            <a>{translate("nv3")}</a>
          </Link>
        </li>
      </ul>
      <ul className="desktop-nav_list">
        <li className="right-header nav_header">{translate("anadir")}</li>
        <li
          className={`list_element ${
            router.pathname === CREATE_PRODUCT_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_PRODUCT_URL}>
            <a>{translate("nv4")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_EXPENSE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_EXPENSE_URL}>
            <a>{translate("nv5")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_SELL_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_SELL_URL}>
            <a>{translate("nv6")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_HIVE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_HIVE_URL}>
            <a>{translate("nv7")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
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

export default DesktopSidebar;
