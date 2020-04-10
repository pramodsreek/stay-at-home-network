import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {'   '} Page Not Found
      </h1>
      <p className='large'>
        This page does not exist, Please follow the links enabled in the site.
      </p>
    </Fragment>
  );
};

export default NotFound;
