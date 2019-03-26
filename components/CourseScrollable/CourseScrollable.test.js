import React from 'react';
import { shallow } from 'enzyme';

import CourseScrollable from './CourseScrollable';

describe('Testing CourseScrollable Component', () => {
  const defaultProps = {
    list: []
  };

  const emptyOnItemPressWrapper = () => {
    return () => {};
  };

  const emptyOnSetSelectCourseIndex = () => {};

  it('renders as expected with course list', () => {
    const wrapper = shallow(
      <CourseScrollable {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with course list and events', () => {
    const wrapper = shallow(
      <CourseScrollable
        onItemPressWrapper={emptyOnItemPressWrapper}
        onSetSelectCourseIndex={emptyOnSetSelectCourseIndex}
        {...defaultProps}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with course list and default expanded settings', () => {
    const wrapper = shallow(
      <CourseScrollable {...defaultProps} expandedList={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
