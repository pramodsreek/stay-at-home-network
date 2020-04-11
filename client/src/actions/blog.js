import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_BLOGS,
  BLOG_ERROR,
  UPDATE_LIKES,
  DELETE_BLOG,
  ADD_BLOG,
  GET_BLOG,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Get Blogs
export const getBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blogs');

    dispatch({
      type: GET_BLOGS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/blogs/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/blogs/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/blogs/${id}`);

    dispatch({
      type: DELETE_BLOG,
      payload: id,
    });

    dispatch(setAlert('Blog Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add blog
export const addBlog = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/blogs', formData, config);

    dispatch({
      type: ADD_BLOG,
      payload: res.data,
    });

    dispatch(setAlert('Blog Created', 'success'));
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get Blog
export const getBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);

    dispatch({
      type: GET_BLOG,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/blogs/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Created', 'success'));
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/blogs/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
