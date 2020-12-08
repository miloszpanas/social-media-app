import React, { useState, useEffect, useContext } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import StateContext from "../StateContext";

const EditPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const [postCount, setPostCount] = useState(0);
  const [formValues, setFormValues] = useState({});
  const { id } = useParams();
  const appState = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    // clean up variable needed to clear axios request
    const ourRequest = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });
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
    };
  }, []);

  const handleFormSubmit = (values) => {
    setFormValues(values);
    setPostCount(prevCount => prevCount + 1);
  };

  console.log(postCount);

  useEffect(() => {
    if (postCount) {
      const ourRequest = axios.CancelToken.source();
      const postData = async () => {
        try {
          await axios.post(
            `/post/${id}/edit`,
            {
              title: formValues.title,
              body: formValues.body,
              token: appState.user.token,
            },
            {
              cancelToken: ourRequest.token,
            }
          ),
            console.log("post created");
          history.push(`/post/${id}`);
        } catch (e) {
          console.log(e, "there was an error");
        }
      };
      postData();

      return () => {
        ourRequest.cancel();
      };
    }
  }, [postCount]);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="Edit post">
      <Formik
        initialValues={{
          title: post.title,
          body: post.body,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          body: Yup.string().required("Enter body content"),
        })}
        onSubmit={(fields, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
          }, 0);
          handleFormSubmit(fields);
          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
              </label>
              <Field
                autoFocus
                name="title"
                id="post-title"
                className={
                  "form-control form-control-lg form-control-title" +
                  (errors.title && touched.title ? " is-invalid" : "")
                }
                type="text"
                placeholder=""
                autoComplete="off"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
              </label>
              <Field
                name="body"
                as="textarea"
                id="post-body"
                className={
                  "body-content tall-textarea form-control" +
                  (errors.body && touched.body ? " is-invalid" : "")
                }
                type="text"
                rows="4"
              ></Field>
              <ErrorMessage
                name="body"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Edit Post
            </button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default EditPost;
