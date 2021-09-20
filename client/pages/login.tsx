import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser, logIn } from '../store/user/user';
import { translate } from '../utils/utils';

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // the login operation is asyncronous by definition
    await dispatch(logIn(email, password));
    router.push("/expenses");
  };
  return (
    <main className="fullscreen-form-container">
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title uppercase">{translate("lgI")}</h1>
        <label htmlFor="email-in">{translate("correo")}</label>
        <input
          type="email"
          name=""
          id="email-in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-in">{translate("clave")}</label>
        <input
          type="password"
          name=""
          id="password-in"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {user.error && <p className="error-message">{user.error}</p>}
        <button className="btn btn-primary">Login</button>
        <p className="info-message">
          <Link href="/signup">
            <a>{translate("sinCuenta")}</a>
          </Link>
        </p>
        <p className="info-message">
          <Link href="">
            <a>{translate("claveOlvidada")}</a>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
