import { FormEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LOGIN_URL } from '../config/config';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser, signUp } from '../store/user/user';
import { translate } from '../utils/utils';

function SignUp() {
  const router = useRouter();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signUp(email, password, username));
    router.push("/production");
  };
  return (
    <main className="fullscreen-form-container">
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title uppercase">{translate("registrarse")}</h1>
        <label htmlFor="username-in">{translate("usuario")}</label>
        <input
          type="text"
          name=""
          id="username-in"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>{translate("nombreDeUsuarioGuia")}</p>
        <label htmlFor="email-in">{translate("correo")}</label>
        <input
          type="email"
          name=""
          id="email-in"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-in">{translate("clave")}</label>
        <input
          type="password"
          name=""
          id="password-in"
          onChange={(e) => setPassword(e.target.value)}
        />
        {user.error && <p className="error-msg">{user.error}</p>}
        <button className="btn btn-primary">{translate("registrarse")}</button>
        <p className="info-message">
          <Link href={LOGIN_URL}>
            <a>{translate("tieneCuenta")}</a>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignUp;
