import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, checkProps } from './testUtils';
import { Provider } from 'react-redux';
import AddExpertise from '../../src/components/profileforms/AddExpertise';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockStore = configureMockStore();
const store = mockStore({});

const setup = (category = 'fun') => {
  return shallow(
    <Provider store={store}>
      <AddExpertise category={category} />
    </Provider>
  );
};

test('does not throw exception', () => {
  checkProps(AddExpertise, { category: 'fun' });
});

describe('state controlled input field', () => {
  test('state updates with value of input box upon change', () => {
    const mockSetCurrentCategory = jest.fn();
    React.useState = jest.fn(() => ['', mockSetCurrentCategory]);

    const wrapper = setup();
    console.log(wrapper.debug());
    const inputBox = findByTestAttr(wrapper, 'category');
    const mockEvent = { target: { target: { value: 'fun testing' } } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentCategory).toHaveBeenCalledWith('fun testing');
  });
});
