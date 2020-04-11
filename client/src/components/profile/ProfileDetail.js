import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faCode,
  faHamburger,
  faCheck,
  faWalking,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';

const ProfileDetail = ({
  profile: {
    user: { name },
  },
}) => {
  return (
    <Fragment>
      <div class='profile-about bg-light p-2'>
        <h2 class='text-primary'>Hello from {name.trim().split(' ')[0]}</h2>
        <p>
          I live in the area and I can help you to know more about the area.
        </p>
        <div class='line'></div>
        <h2 class='text-primary'>Some of my Local Expertise</h2>
        <div class='skills'>
          <div class='p-1'>
            <FontAwesomeIcon icon={faShoppingBasket} /> Shopping
          </div>
          <div class='p-1'>
            <FontAwesomeIcon icon={faCoffee} /> Coffee
          </div>
          <div class='p-1'>
            <FontAwesomeIcon icon={faWalking} /> Walks
          </div>
          <div class='p-1'>
            <FontAwesomeIcon icon={faHamburger} /> Take Aways
          </div>
          <div class='p-1'>
            <FontAwesomeIcon icon={faCheck} /> Code{' '}
            <FontAwesomeIcon icon={faCode} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileDetail.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileDetail;
