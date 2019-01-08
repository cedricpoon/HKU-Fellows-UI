import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Drawer } from 'hkufui/components';
import { onLogout } from './drawerAction';

export class DrawerMenu extends PureComponent {
  render() {
    // restProps as required in DrawerItems
    const { onLogout, ...restProps } = this.props;
    return (
      <Drawer onLogout={onLogout} {...restProps} />
    );
  }
}

DrawerMenu.propTypes = {
  onLogout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => { dispatch(onLogout()) }
})

export default connect(
  null,
  mapDispatchToProps
)(DrawerMenu);
