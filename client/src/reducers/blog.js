import {
  GET_BLOGS,
  BLOG_ERROR,
  UPDATE_LIKES,
  DELETE_BLOG,
  ADD_BLOG,
  GET_BLOG,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
  blogs: [],
  blog: null,
  loading: true,
  error: {},
};

//remove comment, bring in all the comments except the one with id
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case GET_BLOG:
      return {
        ...state,
        blog: payload,
        loading: false,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        loading: false,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === payload.id ? { ...blog, likes: payload.likes } : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== payload.id),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        blog: { ...state.blog, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: state.blog.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
