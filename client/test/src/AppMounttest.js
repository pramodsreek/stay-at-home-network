import { mount } from 'enzyme';
import sinon from 'sinon';
import AddExpertise from '../../src/components/profileforms/AddExpertise';

describe('<AddExpertise />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(AddExpertise.category, 'componentDidMount');
    const wrapper = mount(<AddExpertise />);
    expect(AddExpertise.prototype.componentDidMount).to.have.property(
      'callCount',
      1
    );
  });

  it('allows us to set props', () => {
    const wrapper = mount(<AddExpertise bar='baz' />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'AddExpertise' });
    expect(wrapper.props().bar).to.equal('AddExpertise');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<AddExpertise onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
