import React, { Component } from 'react';
import { Container } from 'native-base';

import { Header } from 'hkufui/components'

class SelectCourse extends Component {

  render() {
    return (
      <Container>
        <Header title='Courses' backable />
      </Container>
    );
  }
}

export default SelectCourse;
