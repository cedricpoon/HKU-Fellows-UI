import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';

import FilterPopup from './FilterPopup/FilterPopup';
import { mapLayoutToState } from 'hkufui/components/helper';
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

  renderFilterPopup() {
    const { filterLayout, showFilterPopup, footerLayout } = this.state;

    if (showFilterPopup) {
      return(
        <FilterPopup
          position={filterLayout.x + filterLayout.width - 10}
          parentHeight={footerLayout.height}
          toggle={this.filterToggle}
          rightSided
        />
      );
    }
    return null;
  }

  render() {
    return (
      <Footer
        onLayout={mapLayoutToState("footerLayout", this)}
        style={styles.footer}
      >
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
            onLayout={mapLayoutToState("filterLayout", this)}
          >
            <Icon name="list"></Icon>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default PreviewFooter;
