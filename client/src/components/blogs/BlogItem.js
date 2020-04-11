import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteBlog } from '../../actions/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const BlogItem = ({
  addLike,
  removeLike,
  deleteBlog,
  auth,
  blog: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <FontAwesomeIcon icon={faThumbsUp} /> {'   '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <Link to={`/blogs/${_id}`} class='btn btn-primary'>
              Comments{' '}
              {comments.length > 0 && (
                <span class='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deleteBlog(_id)}
                type='button'
                class='btn btn-danger'
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

BlogItem.defaultProps = {
  showActions: true,
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deleteBlog })(
  BlogItem
);
