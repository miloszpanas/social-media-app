import React, { useState, useEffect } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";
import ReactMarkdown from "react-markdown";
import ReactTooltip from "react-tooltip";

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const {id} = useParams();

  useEffect(() => {
    // clean up variable needed to clear axios request
    const ourRequest = axios.CancelToken.source()

    const fetchData = async () => {
      try {
        const response = await axios.get(`/post/${id}`, {cancelToken: ourRequest.token});
        setPost(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e, "there was an error");
      }
    };

    fetchData();

    // cleaning up
    return () => {
      ourRequest.cancel();
    }
  }, [])

  if (isLoading) return <Page title="..."><LoadingDotsIcon /></Page>

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link to={`/post/${id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
            <i className="fas fa-edit"></i>
          </Link>
          <ReactTooltip id="edit" className="custom-tooltip"/>
          <a data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
            <i className="fas fa-trash"></i>
          </a>
          <ReactTooltip id="delete"/>
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
        <ReactMarkdown source={post.body} allowedTypes={["paragraph", "strong", "text", "heading", "list", "listItem"]}/>
      </div>
    </Page>
  );
};

export default ViewSinglePost;
