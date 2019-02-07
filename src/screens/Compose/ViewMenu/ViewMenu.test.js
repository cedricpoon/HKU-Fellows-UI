import React from 'react';
import { shallow } from 'enzyme';
import ViewMenu from './ViewMenu';

describe('Testing ViewMenu Screen', () => {
  const requiredProps = {
    position: {x: 0, y: 0},
    toggle: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <ViewMenu {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
