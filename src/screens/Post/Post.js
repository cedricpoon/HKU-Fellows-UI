import React, { Component } from 'react';
import { Text, Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Header } from 'hkufui/components';
import styles from './Styles';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      topicId: navigation.getParam('topicId', 'Undefined')
    });
  }

  render() {
    const { topicId } = this.state;

    return (
      <Container>
        <Header
          title={{
            context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat feugiat mauris ut tristique.',
            numberOfLines: 4,
            size: styles.title.fontSize
          }}
          subtitle={{
            context: 'Nulla vulputate, diam nec feugiat facilisis, justo dolor convallis ligula, eu placerat nulla lacus a ante.',
            numberOfLines: 3
          }}
          backable
        />
        <Text>
          TopicId: {topicId}
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
