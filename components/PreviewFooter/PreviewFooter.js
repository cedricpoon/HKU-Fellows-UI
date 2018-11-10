import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import PopupMenu from './PopupMenu/PopupMenu';
import styles from './Styles';

class PreviewFooter extends Component {

  constructor(props) {
    super(props);
    this.state = { showFilterPopup: false };

    this.filterToggle = this.filterToggle.bind(this);
  }

  filterToggle() {
    this.setState(prevState => ({
      showFilterPopup: !prevState.showFilterPopup
    }));
  }

  setLayoutToState(key) {
    return ((event) => {
      let _state = {};
      _state[key] = event.nativeEvent.layout;
      this.setState(_state);
    }).bind(this);
  }

  renderFilterPopup() {
    const { filterLayout, showFilterPopup, footerLayout } = this.state;

    if (showFilterPopup) {
      return(
        <PopupMenu
          position={filterLayout.x + filterLayout.width - 10}
          parentHeight={footerLayout.height}
          toggle={this.filterToggle}
          rightSided
        >
          <Button full transparent info iconRight>
            <Text>From Moodle</Text>
            <Icon name="at"></Icon>
          </Button>
          <Button full transparent success iconRight>
            <Text>Latest Post</Text>
            <Icon name="time"></Icon>
          </Button>
          <Button full transparent success iconRight>
            <Text>Most Replied</Text>
            <Icon name="undo"></Icon>
          </Button>
          <Button full transparent success iconRight>
            <Text>Popularity</Text>
            <Icon name="people"></Icon>
          </Button>
        </PopupMenu>
      );
    }
    return null;
  }

  render() {
    return (
      <Footer onLayout={this.setLayoutToState("footerLayout")} style={styles.footer}>
        { this.renderFilterPopup() }
        <FooterTab>
          <Button>
            <Icon name="menu" />
          </Button>
          <Button>
            <Icon name="create" />
          </Button>
          <Button>
            <Icon name="refresh" />
          </Button>
          <Button
            onPress={this.filterToggle}
            onLayout={this.setLayoutToState("filterLayout")}>
            <Icon name="list"></Icon>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default PreviewFooter;
