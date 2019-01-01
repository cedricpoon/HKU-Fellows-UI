import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';

import NavigationService from 'hkufui/src/NavigationService';
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

  _renderFilterPopup() {
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
    const { muted, onRefresh } = this.props;

    return (
      <Footer style={styles.footer}>
        { this._renderFilterPopup() }
        <FooterTab
          onLayout={mapLayoutToState("footerLayout", this)}
        >
          <Button onPress={NavigationService.openDrawer}>
            <Icon name="menu" type="MaterialIcons" />
          </Button>
          {!muted && (
            <Button onPress={onRefresh}>
              <Icon name="refresh" type="MaterialIcons" />
            </Button>
          )}
          {!muted && (
            <Button>
              <Icon name="add" type="MaterialIcons" />
            </Button>
          )}
          {!muted && (
            <Button
              onPress={this.filterToggle}
              onLongPress={this.filterToggle}
              onLayout={mapLayoutToState("filterLayout", this)}
            >
              <Icon name="sort-descending" type="MaterialCommunityIcons"></Icon>
            </Button>
          )}
          <Button
            onPress={()=>{ NavigationService.navigate('SelectCourse') }}
          >
            <Icon name="library-books" type="MaterialIcons" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

PreviewFooter.propTypes = {
  muted: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired
}

export default PreviewFooter;
