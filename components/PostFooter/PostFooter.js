import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';

class PostFooter extends Component {
  render() {
    const { firstPage } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button transparent={firstPage} disabled={firstPage}>
            <Icon name="arrow-left" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="share-variant" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="message-reply" type="MaterialCommunityIcons" />
          </Button>
          <Button>
            <Icon name="arrow-right" type="MaterialCommunityIcons" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

PostFooter.propTypes = {
  firstPage: PropTypes.bool
}

export default PostFooter;
