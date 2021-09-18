import Head from "next/head";

import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getUser, logIn, logOut } from "../store/user/user";
import { loadHives } from "../store/entities/hives";

import { FormattedMessage } from "react-intl";
export default function Home() {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();
  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>

      <section className="game-board">
        <div className="">{}</div>
        <div>Name:{user.name}</div>
        <button
          onClick={() => dispatch(logIn("testemail@gmail.com", "lavacalola"))}
        >
          Log In
        </button>
        <button onClick={() => dispatch(logOut())}>
          <FormattedMessage defaultMessage="Log Out" />
        </button>
        <button onClick={() => dispatch(loadHives())}></button>
      </section>
    </>
  );
}
