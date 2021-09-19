import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getUser, logIn } from "../store/user/user";

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logIn(email, password));
    router.push("/expenses");
  };
  return (
    <main className="fullscreen-form-container">
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">LOGIN</h1>
        <label htmlFor="email-in">Email</label>
        <input
          type="email"
          name=""
          id="email-in"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-in">Password</label>
        <input
          type="password"
          name=""
          id="password-in"
          onChange={(e) => setPassword(e.target.value)}
        />
        {user.error && <p className="error-message">{user.error}</p>}
        <button className="btn btn-primary">Login</button>
        <p className="info-message">
          <Link href="/signup">
            <a>Don't have an account yet?</a>
          </Link>
        </p>
        <p className="info-message">
          <Link href="">
            <a>Forgot password?</a>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
