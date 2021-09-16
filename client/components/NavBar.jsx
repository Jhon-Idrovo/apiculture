import Link from "next/link";
import { useRouter } from "next/router";
import { getUser, reloadUserFromToken } from "../store/user/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
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
        <a>LOGO</a>
      </Link>
      <div className="nav-menu">
        <input type="checkbox" id="menu-check" />
        <div></div>
        <ul className="nav-list">
          <li>Products</li>
          <li>About</li>
          <li>Community</li>
          <li>Find Us</li>
          <li>FAQ</li>
          <li className="hover:border-opacity-0 ">
            <button type="button" className="btn-base">
              Buy Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
