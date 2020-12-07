import React, { useContext, useEffect, useState } from "react";
import StateContext from "../StateContext";
import Page from "./Page";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfilePosts from "./ProfilePosts";

const Profile = () => {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUserName: "",
    profileAvatar: "",
    isFollowing: false,
    counts: {
      postCount: "",
      followerCount: "",
      followingCount: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/profile/${username}`, {
          token: appState.user.token,
        });
        setProfileData(response.data);
      } catch (e) {
        console.log(e, "there was an error");
      }
    };

    fetchData();
  }, []);

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} />{" "}
        {profileData.profileUserName}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts profileData={profileData}/>
    </Page>
  );
};

export default Profile;
