import React from 'react';
import PropTypes from 'prop-types';

const ProfileExpertise = ({
  expertise: { category, subcategory, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{category}</h3>
      <p>
        <strong>{subcategory}</strong>
      </p>
      <p>{description}</p>
    </div>
  );
};

ProfileExpertise.propTypes = {
  expertise: PropTypes.array.isRequired,
};

export default ProfileExpertise;
