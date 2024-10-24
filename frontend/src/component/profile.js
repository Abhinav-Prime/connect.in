import { useState, useEffect } from "react";
const Profile = () => {
  const navItem = Array.from(document.querySelectorAll(".nav-item span"));
  navItem.map((el) => (el.style.backgroundColor = "#1a1b20"));

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/user")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsPending(false);
      });
  }, []);

  !isPending && localStorage.setItem("userData", JSON.stringify(data));

  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <div className="my-profile">
      <div className="details">
        <div className="info-card">
          {/* <img className="bg-pic" src={data[0].backgroundPic} alt="" /> */}
          {/* <img src={data[0].profilePic} alt="" className="profile-pic" /> */}
          <div className="info">
            {/* <h2 className="name">{data[0].fname + " " + data[0].lname}</h2> */}
            {/* <p className="branch">Branch - {data[0].branch}</p> */}
            {/* <p className="sem">{data[0].sem} Semester</p> */}
            <p className="connection">
              {/* {data[0].connections.length} connection */}
            </p>
          </div>
        </div>
      </div>
      <div className="explore"></div>
    </div>
  );
};

export default Profile;
