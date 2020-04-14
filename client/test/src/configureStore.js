import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from '../../src/reducers/index';

export const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(combineReducers);
