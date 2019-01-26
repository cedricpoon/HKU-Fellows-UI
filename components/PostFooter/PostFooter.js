import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';

class PostFooter extends Component {
  render() {
    const { firstPage, lastPage, onPageChangeThunk, onRefresh, enableRefresh } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button transparent={firstPage} disabled={firstPage} onPress={onPageChangeThunk(-1)}>
            <Icon name="arrow-left" type="MaterialCommunityIcons" />
          </Button>
          <Button onPress={onRefresh} transparent={!enableRefresh} disabled={!enableRefresh} >
            <Icon name="refresh" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="comment-text-outline" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="share-variant" type="MaterialCommunityIcons" />
          </Button>
          <Button transparent={lastPage} disabled={lastPage} onPress={onPageChangeThunk(1)}>
            <Icon name="arrow-right" type="MaterialCommunityIcons" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

PostFooter.defaultProps = {
  onPageChangeThunk: () => { return null },
  enableRefresh: true
}

PostFooter.propTypes = {
  firstPage: PropTypes.bool,
  lastPage: PropTypes.bool,
  onPageChangeThunk: PropTypes.func,
  onRefresh: PropTypes.func,
  enableRefresh: PropTypes.bool
}

export default PostFooter;
