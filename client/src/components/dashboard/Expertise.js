import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteExpertise } from '../../actions/profile';

const Expertise = ({ expertise, deleteExpertise }) => {
  const expertises = expertise.map((expt) => (
    <tr key={expt._id}>
      <td>{expt.category}</td>
      <td className='hide-sm'>{expt.subcategory}</td>
      <td className='hide-sm'>{expt.description}</td>
      <td>
        <button
          onClick={() => deleteExpertise(expt._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
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
  deleteExpertise: PropTypes.func.isRequired,
};

export default connect(null, { deleteExpertise })(Expertise);
