import React, { Component } from 'react';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { format } from 'timeago.js';
import PropTypes from 'prop-types';

import { Header, PostSwipable } from 'hkufui/components';
import postStyles from '../Post/Styles';
import styles from './Styles';

export class ComposePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', subtitle: null, hashtags: null, content: '', anonymity: false, native: true };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // passed props from <ViewMenu />
    if (navigation) {
      const { params: payload } = navigation.state;
      this.setState({ ...payload });
    }
  }

  render() {
    const { title, subtitle, content, anonymity, native } = this.state;
    const { username } = this.props;

    return (
      <Container>
        <Header
          title={{
            context: `[Preview] ${title}`,
            numberOfLines: 4,
            color: native ? postStyles.nativeTitle.color : postStyles.moodleTitle.color
          }}
          subtitle={subtitle && {
            context: subtitle,
            numberOfLines: 3
          }}
          animated={false}
          backable
          rightIcon='send'
          rightStyle={styles.send}
          onRightPress={() => {}}
        />
        <PostSwipable
          comments={[{
            id: '0'.repeat(64), /* mock of SHA-256 hash */
            author: anonymity ? null : username,
            timestamp: format(Date.now()),
            content,
            temperature: 0 /* no temperature at first */
          }]}
          native={native}
        />
      </Container>
    );
  }
}

ComposePreview.propTypes = {
  username: PropTypes.string
}

const mapStateToProps = state => ({
  username: state.credential.userId
});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposePreview));
