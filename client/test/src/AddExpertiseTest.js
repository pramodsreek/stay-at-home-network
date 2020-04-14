import React, { Fragment, useState } from 'react';

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
      <h1 className='large text-primary'>Add a Local Expertise</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any expertise or knowledge
        that you have about the local area. It can be the best places to
        excercise, best times to go to local supermarket or a place to takeaway
        coffee. Example: category: Shopping, subcategory: Frozen Food,
        Description: Coles has the best collection of frozen food from NoBrand.
      </p>
      <small>* = required field</small>
      <form
        className='form'
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
        <div className='form-group'>
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
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

export default AddExpertise;
