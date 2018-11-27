import React from 'react';
import { shallow } from 'enzyme';
import { SelectCourse } from './SelectCourse';

describe('Testing SelectCourse Screen', () => {
  const defaultProps = {
    courses: [],
    onUpdateLocationAndLoadPost: () => {},
    onSetSelectCourseIndex: () => {}
  }

  it('renders as expected with defaultProps', () => {
    const wrapper = shallow(
      <SelectCourse {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with defaultProps and breadcrumb', () => {
    const wrapper = shallow(
      <SelectCourse {...defaultProps} breadcrumb={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
