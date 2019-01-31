import React, { Component } from 'react';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';

export class Compose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
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
