import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { FlatList as RNFlatList } from 'react-native';

import { FADE_IN_DURATION } from 'hkufui/components/Constants';
import { makeAnimatable } from 'hkufui/components/helper';

const FlatList = makeAnimatable(RNFlatList);

class Scrollable extends PureComponent {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  render() {
    const { items, itemRenderer, ...restProps } = this.props

    if (items.length > 0) {
      return (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={itemRenderer}
          animation='fadeIn'
          duration={FADE_IN_DURATION}
          {...restProps}
        />
      );
    } else {
      return null;
    }
  }
}

Scrollable.propTypes = {
  items: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  onUnmount: PropTypes.func
};

export default Scrollable;
