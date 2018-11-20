import React from 'react';
import { shallow } from 'enzyme';
import SelectCourse from './SelectCourse';

describe('Testing SelectCourse Screen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <SelectCourse />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
