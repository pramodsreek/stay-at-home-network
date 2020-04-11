import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileHead from './ProfileHead';
import ProfileDetail from './ProfileDetail';
import ProfileExpertise from './ProfileExpertise';
import { getProfileById } from '../../actions/profile';

//we get the id from the url, in react props.match.params.id can give the id
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]); //[] runs immediately when profile mounts

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/editprofile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileHead profile={profile} />
            <ProfileDetail profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Local Expertise</h2>
              {profile.localexpertise.length > 0 ? (
                <Fragment>
                  {profile.localexpertise.map((expertise) => (
                    <ProfileExpertise
                      key={expertise._id}
                      expertise={expertise}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Local Expertise Listed</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

//auth state required, if the profile belongs to person logged in, then they can edit
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
