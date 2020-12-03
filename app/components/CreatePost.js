import React, { useState } from "react";
import Page from "./Page";
import axios from "axios";
import { Redirect } from "react-router-dom";

const CreatePost = ({ addFlashMessage }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [idReturnedFromServer, setIdReturnedFromServer] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const { title, body } = formData;
    e.preventDefault();
    try {
      const response = await axios.post("/create-post", {
        title,
        body,
        token: localStorage.getItem("complexAppToken"),
      });
      console.log("post created");
      setIdReturnedFromServer(response.data);
    } catch (e) {
      console.log(e, "there was an error");
    }
  };

  if (idReturnedFromServer) {
    addFlashMessage("The message was posted");
    return <Redirect to={`/post/${idReturnedFromServer}`}/>
  }

  return (
    <Page title="Create new post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={onInputChange}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            onChange={onInputChange}
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default CreatePost;
