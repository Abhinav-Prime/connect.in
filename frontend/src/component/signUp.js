import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [addmissionNo, setAddmissionNo] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [skills, setSkills] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassowrd] = useState("");
  const handleFormSubmit=async(e)=>{
    const url="http://localhost:5000/signup";

  e.preventDefault();
  const obj={
    username:addmissionNo,name:username,email:email,branch:branch,sem:semester,password:password
  }
  const res= await axios.post(url,obj);
  if(res.status==201){
   navigate('/')
  }
  }
  return (
    <div className="sign-up">
      <div className="nav">
        <div className="logo">
          <h2>
            Connect <div>in</div>
          </h2>
        </div>
      </div>
      <div className="form-container">
        <div className="form">
          <strong>
            <h2>
              Sign up as <span>student</span>
            </h2>
          </strong>
          <hr />
          {/* https://mighty-plateau-41033.herokuapp.com/users */}
          <form
            onSubmit={handleFormSubmit}
            className="form-signup"
          >
            <div className="sign-up-form">
              <div className="form-inp">
                <label htmlFor="">Your name</label>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-inp">
                <label htmlFor="">Addmission Number</label>
                <input
                  type="text"
                  placeholder="Addmission no. ex: 21CS***"
                  name="username"
                  value={addmissionNo}
                  onChange={(e) => setAddmissionNo(e.target.value)}
                />
              </div>

              <div className="form-inp">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-inp">
                <label htmlFor="sem">Semester</label>
                <select
                  name="sem"
                  id="sem-inp"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    select
                  </option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
              </div>

              <div className="form-inp">
                <label htmlFor="branch">Branch</label>
                <select
                  name="branch"
                  id=""
                  value={branch}
                  onChange={(e) => setBranch(e.target.vaule)}
                >
                  <option value="" disabled selected hidden>
                    select
                  </option>
                  <option value="CSE">CSE</option>
                </select>
              </div>

              <div className="form-inp">
                <label htmlFor="">Skills</label>
                <select
                  name="skills"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    select
                  </option>
                  <option value="Web Developer">Web Developer</option>
                </select>
              </div>

              <div className="form-inp">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-inp">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  name=""
                  value={cnfpassword}
                  onChange={(e) => setCnfpassowrd(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
