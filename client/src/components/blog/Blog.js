import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BlogItem from '../blogs/BlogItem';
import { getBlog } from '../../actions/blog';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Blog = ({ getBlog, blog: { blog, loading }, match }) => {
  useEffect(() => {
    getBlog(match.params.id);
  }, [getBlog]);
  return loading || blog === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/blogs' className='btn'>
        Back to Blogs
      </Link>
      <BlogItem blog={blog} showActions={false} />
      <CommentForm blogId={blog._id} />
      <div className='comments'>
        {blog.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} blogId={blog._id} />
        ))}
      </div>
    </Fragment>
  );
};

Blog.propTypes = {
  getBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

export default connect(mapStateToProps, { getBlog })(Blog);
