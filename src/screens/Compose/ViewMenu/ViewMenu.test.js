import React from 'react';
import { shallow } from 'enzyme';
import ViewMenu from './ViewMenu';

describe('Testing ViewMenu Screen', () => {
  const requiredProps = {
    position: {x: 0, y: 0},
    toggle: () => {},
    payload: { title: 'title', content: 'content' }
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <ViewMenu {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
