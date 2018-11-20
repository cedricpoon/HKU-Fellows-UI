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
            list={courseList}
            ref={ref => this._courseScrollable = ref}
          />
        </Content>
      </Container>
    );
  }
}

export default SelectCourse;
