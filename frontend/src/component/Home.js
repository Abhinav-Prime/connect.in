import { useState, useEffect } from "react";
import Post from "./post";
import axios from "axios";
import p_upload from "../images/p_upload.svg";
import v_upload from "../images/v_upload.svg";
import e_upload from "../images/e_upload.svg";
import a_upload from "../images/a_upload.svg";
const Home = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [textValue, setTextValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState();
  const [isPending, setIsPending] = useState(true);
  const [newPost, setNewPost] = useState();
  useEffect(() => {
    async function getPost() {
      const rawres = await fetch("http://localhost:5000/posts");
      const res = await rawres.json();
      setPosts(res);
      setIsPending(false);
    }
    getPost();
    const sse = new EventSource("http://localhost:5000/post/stream");
    sse.onmessage = (e) => {
      console.log(JSON.parse(e.data));
      setNewPost(JSON.parse(e.data));
    };
  }, []);

  if (newPost) {
    posts.push(newPost);
    setNewPost(null);
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("submit");
    async function sendPost() {
      try {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        console.log(user);
        const formdata = new FormData();
        formdata.append("text", textValue.trim());
        formdata.append("username", user.username);
        formdata.append("timeStamp", new Date().getTime());
        formdata.append("profilePic", user.profilePic);
        formdata.append("sem", user.sem);
        formdata.append("branch", user.branch);
        formdata.append("name", user.name);
        formdata.append("file", file);

        const rawres = await axios.post(
          "http://localhost:5000/posts",
          formdata
        );
        const res = await rawres.json();
        console.log(`res: ${res}`);
      } catch (e) {
        console.log(e.message);
      }
    }
    sendPost();
  };
  return (
    <div className="home">
      <div className="post-container">
        <div>
          <form
            action=""
            className="p-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <img src={userData.profilePic} className="profile-pic" alt="" />
            <div className="post-form">
              <div className="post-inp">
                <input
                  id="text-post"
                  type="text"
                  placeholder="share a post"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  autoComplete="off"
                  required
                />
                <button
                  className="post-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
              <div className="media-inp">
                <span>
                  <img src={p_upload} alt="" />
                  <input
                    className="img-inp"
                    type="file"
                    placeholder="share a post"
                    value={""}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </span>
                <img src={v_upload} alt="" />
                <img src={e_upload} alt="" />
                <img src={a_upload} alt="" />
              </div>
            </div>
          </form>
        </div>
        {isPending && <h1>Loading...</h1>}
        {!isPending &&
          posts
            .map((post) => post)
            .reverse()
            .map((post, i) => <Post data={post} key={i} />)}
      </div>
    </div>
  );
};

export default Home;
