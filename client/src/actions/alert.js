import uuid from 'uuid/v4';

import { SET_ALERT, REMOVE_ALERT } from './types';

//possible due to thunk middleware
//option to provide a timeout and default 5000
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //code for the alert to disappear after set timeout
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};
