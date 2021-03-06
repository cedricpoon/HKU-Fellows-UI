import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Drawer } from 'hkufui/components';
import { onLoadUserTemperature, onActiveLogout } from './drawerAction';

export class DrawerMenu extends PureComponent {
  render() {
    // restProps as required in DrawerItems
    const { onLogout, userId, token7digits, onTemperature, userTemp, ...restProps } = this.props;
    return (
      <Drawer
        username={userId}
        token7digits={token7digits}
        temperature={userTemp}
        onLogout={onLogout}
        onTemperature={onTemperature}
        {...restProps}
      />
    );
  }
}

DrawerMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onTemperature: PropTypes.func.isRequired,
  userId: PropTypes.string,
  token7digits: PropTypes.string,
  userTemp: PropTypes.number
}

const mapDispatchToProps = dispatch => ({
  onLogout: async () => { await dispatch(onActiveLogout()) },
  onTemperature: () => { dispatch(onLoadUserTemperature()) }
})

const mapStateToProps = state => {
  const { credential } = state;
  return {
    userId: credential ? credential.userId : null,
    token7digits: credential && credential.token ? state.credential.token.substring(0, 7) : null,
    userTemp: state.profile.temperature
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMenu);
