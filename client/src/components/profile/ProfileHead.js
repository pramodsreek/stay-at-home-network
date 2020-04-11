import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const ProfileHead = ({
  profile: {
    staystatus,
    city,
    state,
    country,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div class='profile-top bg-primary p-2'>
      <img class='round-img my-1' src={avatar} alt='' />
      <h1 class='large'>{name}</h1>
      <p class='lead'>
        {city}, {state}, {country}
      </p>
      <p>{staystatus}</p>

      <div class='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faTwitter} size='2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faFacebook} size='2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faYoutube} size='2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faInstagram} size='2x' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileHead.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileHead;
