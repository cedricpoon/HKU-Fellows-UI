import React from 'react';
import { shallow } from 'enzyme';
import CourseScrollable from './CourseScrollable';

describe('Testing CourseScrollable Component', () => {
  const defaultProps = {
    list: []
  };

  it('renders as expected with course list', () => {
    const wrapper = shallow(
      <CourseScrollable {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
