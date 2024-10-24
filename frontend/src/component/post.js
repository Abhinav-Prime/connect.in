import like from "../images/like.svg";
import unlike from "../images/unlike.svg";
import { useEffect, useState } from "react";
import comment from "../images/comment.svg";
import share from "../images/share.svg";
import timePassed from "../timePassed";
const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const userID = JSON.parse(sessionStorage.getItem("userData"));
  const postData = props.data;

  useEffect(() => {
    postData.likes.includes(userID.username)
      ? setIsLiked(true)
      : setIsLiked(false);
  }, []);

  function showMenu() {
    const menu = document.querySelector(
      `.post-id-${postData._id} .menu-displayed`
    );
    menu.classList.toggle("hidden");
  }

  function addLike() {
    setIsLiked(!isLiked);
    fetch(`http://localhost:5000/like/${postData._id}/${userID.username}`);
  }

  function handleDelete() {
    fetch(`http://localhost:5000/posts/${postData._id}`, {
      method: "DELETE",
    }).then(window.location.reload());
  }

  return (
    <div className={`post post-id-${postData._id}`}>
      <div className="user-profile">
        <img src={postData.profilePic} alt="" className="profile-pic" />
        <span>
          <p className="user-name">{postData.name}</p>
          {postData.branch}
          <br />
          {timePassed(postData.timeStamp)}
        </span>
        <div className="menu" onClick={showMenu}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="menu-displayed hidden">
            <button className="menu-link">Report</button>
            <button className="menu-link">Connect</button>
            <button className="menu-link">Remove Connection</button>
            {userID.username == postData.username ? (
              <button className="menu-link" onClick={handleDelete}>
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="content">
        <p className="post-text">{postData.text}</p>
        {postData.img && (
          <a href={postData.img}>
            <img src={postData.img} className="post-img" />
          </a>
        )}
      </div>
      <hr />
      <div className="post-footer">
        <button onClick={addLike}>
          <img
            className={`like ${isLiked ? "like-shadow" : ""}`}
            src={isLiked ? like : unlike}
          />
        </button>
        <img src={comment} alt="" />
        <img src={share} alt="" />
      </div>
    </div>
  );
};

export default Post;
