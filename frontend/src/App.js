import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import TopNav from "./top-nav";
import Home from "./component/Home";
import Connect from "./component/Connect";
import Event from "./component/Event";
import Society from "./component/Society";
import Help from "./component/Help";
import Profile from "./component/profile";
import Login from "./component/login";
import Signup from "./component/signUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenRecieved, setTokenRecieved] = useState(
    localStorage.getItem("tokenRecieved")
  );
  const token = localStorage.getItem("apiToken");
  // User authentication
  useEffect(() => {
    if (tokenRecieved) {
      async function getAuth() {
        try {
          const rawres = await fetch("http://localhost:5000/authTest", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${token}`,
            },
          });
          const res = await rawres.json();
          console.log(res.auth);
          setIsAuthenticated(res.auth);
          sessionStorage.setItem("authenticated", res.auth);
          if (!res.auth) {
            const refreshToken = localStorage.getItem("refreshToken");
            console.log("refreshing token");
            const rawres = await fetch("http://localhost:5000/refresh", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": `${refreshToken}`,
              },
            });

            const res = await rawres.json();
            localStorage.setItem("apiToken", res.accessToken);
            // getAuth();
          }
        } catch (e) {
          console.log(e.message);
          setIsAuthenticated(false);
          localStorage.setItem("tokenRecieved", false);
        }
      }
      getAuth();
    }
  });
  // userInfo
  useEffect(() => {
    async function userInfo() {
      const rawres = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
        }),
      });
      const res = await rawres.json();
      sessionStorage.setItem("userData", JSON.stringify(res));
    }
    userInfo();
  }, []);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route
            path="/sign-up"
            element={<Signup setToken={setTokenRecieved} />}
          />
          <Route path="/" element={<Login setToken={setTokenRecieved} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <TopNav />
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/connect" element={<Connect />}></Route>
            <Route path="/event" element={<Event />}></Route>
            <Route path="/society" element={<Society />}></Route>
            <Route path="/help" element={<Help />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
