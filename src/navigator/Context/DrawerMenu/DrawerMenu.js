import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Drawer } from 'hkufui/components';
import { onLogout, onLoadUserTemperature } from './drawerAction';

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
  onLogout: () => { dispatch(onLogout()) },
  onTemperature: () => { dispatch(onLoadUserTemperature()) }
})

const mapStateToProps = state => ({
  userId: state.credential.userId,
  token7digits: state.credential.token.substring(0, 7),
  userTemp: state.profile.temperature
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMenu);
