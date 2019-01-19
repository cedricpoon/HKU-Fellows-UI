import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';

class PostFooter extends Component {
  render() {
    const { firstPage, lastPage, onPageChangeThunk } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button transparent={firstPage} disabled={firstPage} onPress={onPageChangeThunk(-1)}>
            <Icon name="arrow-left" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="share-variant" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="comment-text" type="MaterialCommunityIcons" />
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
  onPageChangeThunk: () => { return null }
}

PostFooter.propTypes = {
  firstPage: PropTypes.bool,
  lastPage: PropTypes.bool,
  onPageChangeThunk: PropTypes.func
}

export default PostFooter;
