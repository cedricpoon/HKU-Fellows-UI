import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import { Header, CourseScrollable } from 'hkufui/components'
import { localize } from 'hkufui/locale';
import courseList from 'hkufui/mock/private/courses.json';

const locale = localize({ language: 'en', country: 'hk' });

class SelectCourse extends Component {

  render() {
    return (
      <Container>
        <Header title={locale['header.course']} backable />
        <Content padder>
          <CourseScrollable list={courseList} />
        </Content>
      </Container>
    );
  }
}

export default SelectCourse;
