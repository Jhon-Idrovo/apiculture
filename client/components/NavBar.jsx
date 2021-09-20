import Link from "next/link";
import { useRouter } from "next/router";
import { getUser, reloadUserFromToken } from "../store/user/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { FormattedMessage } from "react-intl";
import { translate } from "../utils/utils";
function NavBar() {
  const router = useRouter();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // recover user from token
    dispatch(reloadUserFromToken());
  }, []);
  return (
    <nav className="nav-bar">
      <Link href="/">
        <a className="nav-logo">LOGO</a>
      </Link>
      <hr />

      <ul className="nav-list">
        <li className={`${router.pathname === "/sells" && "nav-list-active"}`}>
          <Link href="/sells">
            <a>{translate("nv1")}</a>
          </Link>
        </li>
        <li
          className={`${router.pathname === "/expenses" && "nav-list-active"}`}
        >
          <Link href="/expenses">
            <a>{translate("nv2")}</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/production" && "nav-list-active"
          }`}
        >
          <Link href="/production">
            <a>{translate("nv3")}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
