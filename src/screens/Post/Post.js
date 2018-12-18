import React, { Component } from 'react';
import { Text, Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

export class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Text>
          Post: { navigation.getParam('postId', 'Undefined') }
        </Text>
      </Container>
    );
  }
}

Post.propTypes = {

}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));
