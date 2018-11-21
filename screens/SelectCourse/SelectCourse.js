import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';

import { Header, CourseScrollable } from 'hkufui/components'
import { localize } from 'hkufui/locale';
import courses from 'hkufui/mock/public/courses'

const locale = localize({ language: 'en', country: 'hk' });

class SelectCourse extends Component {
  render() {
    const { courses } = this.props;

    return (
      <Container>
        <Header
          title={locale['header.course']}
          backable
          rightIcon='arrow-dropup'
          onRightPress={() => {
            this._courseScrollable.collapseAll();
          }}
          onRef={ref => this._header = ref}
        />
        <Content padder>
          <CourseScrollable
            list={courses}
            ref={ref => this._courseScrollable = ref}
          />
        </Content>
      </Container>
    );
  }
}

/* Mocking mapStateToProps */
SelectCourse.defaultProps = {
  courses: courses
}

SelectCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SelectCourse;
