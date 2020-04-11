import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpertise } from '../../actions/profile';

const AddExpertise = ({ addExpertise, history }) => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    description: '',
  });

  const { category, subcategory, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class='large text-primary'>Add a Local Expertise</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any expertise or knowledge that
        you have about the local area. It can be the best places to excercise,
        best times to go to local supermarket or a place to takeaway coffee.
        Example: category: Shopping, subcategory: Frozen Food, Description:
        Coles has the best collection of frozen food from NoBrand.
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExpertise(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Category'
            name='category'
            value={category}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Sub Category'
            name='subcategory'
            value={subcategory}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
            required
            cols='30'
            rows='5'
            placeholder='* Description'
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExpertise.propTypes = {
  addExpertise: PropTypes.func.isRequired,
};

export default connect(null, { addExpertise })(withRouter(AddExpertise));
