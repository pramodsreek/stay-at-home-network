import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Expertise = ({ expertise }) => {
  const expertises = expertise.map((expt) => (
    <tr key={expt._id}>
      <td>{expt.category}</td>
      <td className='hide-sm'>{expt.subcategory}</td>
      <td className='hide-sm'>{expt.description}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Local Expertise</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Category</th>
            <th classname='hide-sm'>Sub Category</th>
            <th classname='hide-sm'>Description</th>
          </tr>
        </thead>
        <tbody>{expertises}</tbody>
      </table>
    </Fragment>
  );
};

Expertise.propTypes = {
  expertise: PropTypes.array.isRequired,
};

export default Expertise;
