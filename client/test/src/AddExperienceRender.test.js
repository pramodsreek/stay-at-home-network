import React from 'react';
import Enzyme, { render } from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import AddExpertise from './AddExpertiseTest';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<AddExpertise />', () => {
  it('renders a div', () => {
    const wrapper = render(<AddExpertise />);
    expect(wrapper.html()).to.contain('div');
  });
});
