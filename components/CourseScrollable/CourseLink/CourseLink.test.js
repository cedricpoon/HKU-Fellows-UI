import React from 'react';
import { shallow } from 'enzyme';

import CourseLink from './CourseLink';

describe('Testing CourseLink Component', () => {
  const defaultProps = {
    title: "CourseLink",
    description: "None"
  };

  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <CourseLink {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and onItemPress', () => {
    const wrapper = shallow(
      <CourseLink {...defaultProps} onItemPress={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected in bottomMost with required props and onItemPress', () => {
    const wrapper = shallow(
      <CourseLink {...defaultProps} onItemPress={() => {}} bottomMost />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
