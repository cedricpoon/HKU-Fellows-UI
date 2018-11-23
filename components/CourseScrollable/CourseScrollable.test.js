import React from 'react';
import { shallow } from 'enzyme';
import CourseScrollable from './CourseScrollable';

describe('Testing CourseScrollable Component', () => {
  const defaultProps = {
    list: []
  };

  const emptyOnItemPressHandler = () => {
    return () => {};
  };

  it('renders as expected with course list', () => {
    const wrapper = shallow(
      <CourseScrollable {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with course list and onItemPressHandler', () => {
    const wrapper = shallow(
      <CourseScrollable {...defaultProps} onItemPressHandler={emptyOnItemPressHandler} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
