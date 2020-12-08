import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const myRequest = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/profile/${username}/posts`, {cancelToken: myRequest.token});
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was an error");
      }
    };

    fetchData();

    return () => {
      myRequest.cancel();
    }
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((element) => {
        const date = new Date(element.createdDate);
        const dateFormatted = `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`
        return (
          <Link key={element._id} to={`/post/${element._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={element.author.avatar} />{" "}
            <strong>{element.title}</strong>{" "}
            <span className="text-muted small">
              on {dateFormatted}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
