import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  country: '',
  state: '',
  city: '',
  staystatus: '',
  twitter: '',
  youtube: '',
  facebook: '',
  instagram: '',
};

//props.history
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  // const [formData, setFormData] = useState({
  //   country: '',
  //   state: '',
  //  city: '',
  //  staystatus: '',
  //  twitter: '',
  // youtube: '',
  //   facebook: '',
  //   instagram: '',
  //});

  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  //useEffect(() => {
  //  getCurrentProfile();

  //  setFormData({
  //    country: loading || !profile.country ? '' : profile.country,
  //   state: loading || !profile.state ? '' : profile.state,
  //   city: loading || !profile.city ? '' : profile.city,
  //   staystatus: loading || !profile.staystatus ? '' : profile.staystatus,
  //   twitter: loading || !profile.social ? '' : profile.social.twitter,
  //   youtube: loading || !profile.social ? '' : profile.social.youtube,
  //   facebook: loading || !profile.social ? '' : profile.social.facebook,
  //   instagram: loading || !profile.social ? '' : profile.social.instagram,
  // });
  // }, [loading, getCurrentProfile]);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    country,
    state,
    city,
    staystatus,
    twitter,
    youtube,
    facebook,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make
        your profile
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='country' value={country} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Country</option>
            <option value='Australia'>Australia</option>
            <option value='New Zealand'>New Zealand</option>
          </select>
          <small className='form-text'>
            Let us know the Country you are living.
          </small>
        </div>
        <div className='form-group'>
          <select name='state' value={state} onChange={(e) => onChange(e)}>
            <option value='0'>* Select State</option>
            <option value='NSW'>New South Wales</option>
            <option value='VIC'>Victoria</option>
            <option value='SI'>South Island</option>
          </select>
          <small className='form-text'>
            Let us know the state you are living.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Let us know the city or suburb you are living.
          </small>
        </div>
        <div className='form-group'>
          <select
            name='staystatus'
            value={staystatus}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Staying at Home status..</option>
            <option value='stayingAtHome'>Staying At Home</option>
            <option value='working'>Working Outside</option>
          </select>
          <small className='form-text'>
            Let us know if you are staying at home or working.
          </small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>(Optional)</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <FontAwesomeIcon icon={faTwitter} size='2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon icon={faFacebook} size='2x' />
              {'   '}
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon icon={faYoutube} size='2x' />
              {'   '}
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon icon={faInstagram} size='2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
