import Link from "next/link";
import { useRouter } from "next/router";
import { getUser, reloadUserFromToken } from "../store/user/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { FormattedMessage } from "react-intl";
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
            <a>
              <FormattedMessage defaultMessage="Sells"></FormattedMessage>
            </a>
          </Link>
        </li>
        <li
          className={`${router.pathname === "/expenses" && "nav-list-active"}`}
        >
          <Link href="/expenses">
            <a>
              <FormattedMessage defaultMessage="Expenses"></FormattedMessage>
            </a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/production" && "nav-list-active"
          }`}
        >
          <Link href="/production">
            <a>
              <FormattedMessage defaultMessage="Production"></FormattedMessage>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
