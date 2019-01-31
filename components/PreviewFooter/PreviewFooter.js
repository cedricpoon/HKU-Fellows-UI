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
    this.state = { footerLayout: { y: 0 }, filterLayout: { x: 0 } };

    this.filterToggle = this.filterToggle.bind(this);
  }

  filterToggle() {
    if (this._popup)
      this._popup.toggle();
  }

  _renderFilterPopup() {
    const { filterLayout, footerLayout } = this.state;

    return(
      <FilterPopup
        position={{x: filterLayout.x, y: footerLayout.y}}
        parentHeight={footerLayout.height}
        onRef={ref => this._popup = ref}
      />
    );
  }

  render() {
    const { muted, onRefresh, refreshing } = this.props;

    return (
      <Footer
        style={styles.footer}
        onLayout={mapLayoutToState("footerLayout", this)}
      >
        { this._renderFilterPopup() }
        <FooterTab>
          <Button onPress={NavigationService.openDrawer}>
            <Icon name="menu" type="MaterialIcons" />
          </Button>
          {!muted && (
            <Button onPress={onRefresh} disabled={refreshing} transparent={refreshing}>
              <Icon name="refresh" type="MaterialIcons" />
            </Button>
          )}
          {!muted && (
            <Button>
              <Icon name="comment-plus-outline" type="MaterialCommunityIcons" />
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
            <Icon name="view-list" type="MaterialIcons" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

PreviewFooter.propTypes = {
  muted: PropTypes.bool,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired
}

export default PreviewFooter;
