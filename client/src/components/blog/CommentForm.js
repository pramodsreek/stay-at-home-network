import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/blog';

const CommentForm = ({ blogId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Looking forward to your comments...</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(blogId, { text });
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
