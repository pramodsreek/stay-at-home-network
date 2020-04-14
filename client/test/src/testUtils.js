import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import combineReducers from '../../src/reducers/index';
import { middlewares } from './configureStore';

export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(combineReducers, initialState);
};

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[name='${val}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};
