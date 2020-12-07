import React, { useState, useEffect } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/post/${id}`);
        setPost(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e, "there was an error");
      }
    };

    fetchData();
  }, [])

  if (isLoading) return <Page title="..."><LoadingDotsIcon /></Page>

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img
            className="avatar-tiny"
            src={post.author.avatar}
          />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {post.createdDate.substring(0, 10)}
      </p>

      <div className="body-content">
        <p>
          {post.body}
        </p>
      </div>
    </Page>
  );
};

export default ViewSinglePost;
