import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBlogs } from '../../actions/blog';
import BlogItem from './BlogItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import BlogForm from './BlogForm';

const Blogs = ({ getBlogs, blog: { blogs, loading } }) => {
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Blogs</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUsers} />
        Welcome to the hood!
      </p>
      <BlogForm />
      <div className='posts'>
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </Fragment>
  );
};

Blogs.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
