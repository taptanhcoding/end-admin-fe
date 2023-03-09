import { useState } from "react";
import { useRouter } from "next/router";
import styles from './login.module.scss';
import classNames from 'classnames/bind';

const cx= classNames.bind(styles);
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        // đăng nhập thành công
        router.push("/dashboard");
      } else {
        // đăng nhập thất bại
        const error = await res.json();
        setError(error.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.loginbox}>
      <h2 style={{fontSize:'40px'}}>Login</h2>
      <form>
        <div className={styles.userbox}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className={styles.userbox}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <a href="#" onClick={handleLogin}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
       
  );
};

export default LoginPage;

