import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { login, type } from '../../src/actions/auth';
//destructure import to get the type returned
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN_FAIL when login has been done', () => {
    fetchMock.mock('http://localhost:3000/login', {
      body: { email: 'macroni-test@test.com', password: 'macfluni-test' },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: LOGIN_FAIL,
        data: {
          errors: [
            {
              msg: 'User or Password not valid!',
            },
          ],
        },
      },
      { type: LOGIN_SUCCESS, payload: '' },
    ];
    const store = mockStore({ payload: '' });

    return store
      .dispatch(login('macroni-test@test.com', 'macfluni-test'))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
