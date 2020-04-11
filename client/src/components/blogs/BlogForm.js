import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBlog } from '../../actions/blog';

const BlogForm = ({ addBlog }) => {
  const [text, setText] = useState('');
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>
          Write anything about the local area that others will find useful...
        </h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addBlog({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a blog'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default connect(null, { addBlog })(BlogForm);
