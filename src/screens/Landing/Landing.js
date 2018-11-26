import { createMaterialTopTabNavigator } from 'react-navigation';

import { Preview, SelectCourse } from 'hkufui/src/screens';

export default createMaterialTopTabNavigator(
  {
    Preview: Preview,
    SelectCourse: SelectCourse
  },
  {
    initialRouteName: 'Preview',
    tabBarOptions: {
      renderIndicator: () => null,
      showLabel: false,
      style: {
        display: 'none'
      }
    }
  }
);