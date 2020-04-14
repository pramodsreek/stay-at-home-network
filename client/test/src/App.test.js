import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory pattern/function to create a shallow wrapper for the App
 * component. Shallow rendering does not include the child components.
 * @function setup
 * @param {object} propers - Component props for the setup
 * @param {any} state - Initial state for the test set up
 * @returns {wrapper} shallow wrapper is an enzyme class
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  //use debug if the error cannot be figured out
  console.log(wrapper.debug());
  //truthy checks it is not undefined, not null
  expect(wrapper).toBeTruthy();
  //expect(wrapper).toBeFalsy();
});

test('renders Renders BrowserRouter component', () => {
  const wrapper = setup();
  const appComponent = wrapper.find('BrowserRouter');
  //how many nodes are inside this
  expect(appComponent.length).toBe(1);
});
