import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/editprofile' class='btn btn-light'>
        <FontAwesomeIcon icon={faUserCircle} /> Edit Profile
      </Link>
      <Link to='/addexpertise' class='btn btn-light'>
        <FontAwesomeIcon icon={faBlackTie} /> Add Expertise
      </Link>
    </div>
  );
};

export default DashboardActions;
