import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import { Preview, SelectCourse } from 'hkufui/src/screens';
import { drawer } from 'hkufui/theme/grid';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

const BrowserIcon = ({ tintColor }) => (
  <Icon name='browser' type='Entypo' style={{ color: tintColor, fontSize: drawer.iconSize }} />
);

BrowserIcon.propTypes = {
  tintColor: PropTypes.string
};

export default createMaterialTopTabNavigator(
  {
    Preview: Preview,
    SelectCourse: SelectCourse
  },
  {
    initialRouteName: 'Preview',
    navigationOptions: {
      drawerLabel: locale['drawer.landing'],
      drawerIcon: BrowserIcon
    },
    tabBarOptions: {
      renderIndicator: () => null,
      showLabel: false,
      style: {
        display: 'none'
      }
    }
  }
);
