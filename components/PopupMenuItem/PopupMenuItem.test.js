import React from 'react';
import { shallow } from 'enzyme';

import PopupMenuItem from './PopupMenuItem';

describe('Testing PopupMenuItem Component', () => {
  it('renders', () => {
    const wrapper = shallow(
      <PopupMenuItem />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
