import React, { Component } from 'react';
import { Text, Container, Content } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, PostFooter } from 'hkufui/components';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  componentDidMount() {
    const { navigation } = this.props;
    /* all props from <PostPreview /> has been passed */
    this.setState({
      ...navigation.state.params
    });
  }

  render() {
    const { id, title, subTitle } = this.state;

    return (
      <Container>
        <Header
          title={{
            context: title,
            numberOfLines: 4
          }}
          subtitle={subTitle && {
            context: subTitle,
            numberOfLines: 3
          }}
          backable
          rightIcon='more'
        />
        <Content>
          <Text>{id}</Text>
        </Content>
        <PostFooter firstPage />
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
