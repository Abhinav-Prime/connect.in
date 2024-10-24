import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchLogo from "./images/Search-logo.png";
import message from "./images/chat.png";
import notification from "./images/notification.png";
import settings from "./images/gear.png";

const TopNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem("userData")));
  }, []);

  const logout = () => {
    localStorage.setItem("refreshToken", null);
    localStorage.setItem("apiToken", null);
    window.location.reload();
  };

  const displaySettings = () => {
    const menu = document.querySelector(".settings-menu");
    const gearImg = document.querySelector(".settings img");
    gearImg.classList.toggle("rotate");
    menu.classList.toggle("hidden");
  };

  return (
    <div className="top-nav primary">
      <div className="logo">
        <h2>
          Connect <div>in</div>
        </h2>
      </div>
      <div className="search">
        <div className="search-input">
          <img src={SearchLogo} alt="" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="profile">
        <div className="message">
          <img src={message} alt="" />
        </div>
        <div className="notification">
          <img src={notification} alt="" />
        </div>
        <div className="settings" onClick={displaySettings}>
          <img src={settings} alt="" />
          <div className="settings-menu hidden">
            <button onClick={logout}>logout</button>
          </div>
        </div>
        <Link to="/profile">
          <div className="user">
            <img src={data?.profilePic} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
