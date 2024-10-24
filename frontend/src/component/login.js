import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import signUpImg from "../images/Signup.png";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const style = {
    textDecoration: "none",
    color: "#1db5e5",
  };
  useEffect(() => {
    const submitBtn = document.querySelector("button");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getToken();
    });
    async function getToken() {
      const form = document.getElementById("login-form");
      const formData = Object.fromEntries(new FormData(form).entries());
      console.log(formData, JSON.stringify(formData));
      const rawres = await fetch("http://localhost:5000/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await rawres.json();
      localStorage.setItem("apiToken", res.token);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("tokenRecieved", true);
      localStorage.setItem("username", formData.username);
      props.setToken(true);
      sessionStorage.setItem("userData", JSON.stringify(res.result));
    }
  }, []);
  return (
    <div className="login">
      <div className="nav">
        <div className="logo">
          <h2>
            Connect <div>in</div>
          </h2>
        </div>
      </div>
      <div className="login-container">
        <form className="login-form" id="login-form">
          <p>Welcome back!</p>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Addmission No. ex: 21CS***"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-links">
            <Link to="/sign-up" style={style}>
              Sign Up ?
            </Link>
            <p className="forget-pass">Forget Password ?</p>
          </div>
          <button className="submit" type="submit">
            Login
          </button>
        </form>
        <div className="signup-img">
          <img src={signUpImg} />
        </div>
      </div>
    </div>
  );
};

export default Login;
