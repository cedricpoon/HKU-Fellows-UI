import React, { Component } from 'react';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Header } from 'hkufui/components';

export class Compose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header
          title={{
            context: 'New Topic'
          }}
          subtitle={{
            context: 'COMP3311'
          }}
          rightIcon='send'
          backable
        />
      </Container>
    );
  }
}

Compose.propTypes = {

}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose));
