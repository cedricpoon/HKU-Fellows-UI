import React from 'react';
import { shallow } from 'enzyme';
import { SelectCourse } from './SelectCourse';

describe('Testing SelectCourse Screen', () => {
  const defaultProps = {
    courses: [],
    onUpdateLocation: () => {},
    onSetSelectCourseIndex: () => {}
  }

  it('renders as expected with defaultProps', () => {
    const wrapper = shallow(
      <SelectCourse {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
