import React, { useEffect, useState } from "react";
import "./profile.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../commons/Loader/Loader";

const UserProfile = () => {
  const [loader, setLoader] = useState(false);

  const { auth, setAuth } = useAuth();
  const user = auth.user;

  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoader(true);
    setAuth({});
    localStorage.removeItem("refreshToken");
    setLoader(false);
    navigate("/sign-in");
  };

  return (
    <div className="user-profile-container">
      {loader ? <Loader /> : ""}

      <div className="btnEdit">
        <button class="button button2" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div class="userProfileParent">
        <div class="div1u">
          <div className="profileCard">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/postings-19356.appspot.com/o/pp.jpg?alt=media&token=3dbeda3d-38f7-4b9c-888d-6244aceaa709"
              alt="profilePic"
              className="profilePic"
            />
          </div>
        </div>
        <div class="div2u">
          <div className="UPDesc">
            <h3>Name: {user.userName}</h3>
          </div>
          <div className="UPDesc">
            <h3>Email: {user.email}</h3>
          </div>
          <div className="UPDesc">
            <h3>Contact: {user.phoneNumber}</h3>
          </div>
          <div className="UPDesc">
            <h3>Address: {user.address}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
