// NavigationService.js

import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  openDrawer
};
