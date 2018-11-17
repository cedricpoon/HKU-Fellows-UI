import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';

import FilterPopup from './FilterPopup/FilterPopup';
import { mapLayoutToState } from 'hkufui/components/helper';
import styles from './Styles';

class PreviewFooter extends Component {

  constructor(props) {
    super(props);
    this.state = { showFilterPopup: false, footerLayout: { height: 0 } };

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
          position={filterLayout.x}
          parentHeight={footerLayout.height}
          toggle={this.filterToggle}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <Footer style={styles.footer}>
        { this.renderFilterPopup() }
        <FooterTab
          onLayout={mapLayoutToState("footerLayout", this)}
        >
          <Button>
            <Icon name="menu" />
          </Button>
          <Button>
            <Icon name="refresh" />
          </Button>
          <Button>
            <Icon name="create" />
          </Button>
          <Button
            onPress={this.filterToggle}
            onLongPress={this.filterToggle}
            onLayout={mapLayoutToState("filterLayout", this)}
          >
            <Icon name="funnel"></Icon>
          </Button>
          <Button
            onPress={()=>{ this.props.navigation.navigate('SelectCourse') }}
          >
            <Icon name="albums" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(PreviewFooter);
