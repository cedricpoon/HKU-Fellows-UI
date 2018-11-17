import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import { Header, CourseScrollable } from 'hkufui/components'
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

class SelectCourse extends Component {

  render() {
    return (
      <Container>
        <Header title={locale['header.course']} backable />
        <Content padder>
          <CourseScrollable />
        </Content>
      </Container>
    );
  }
}

export default SelectCourse;
