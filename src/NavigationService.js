// NavigationService.js

import { NavigationActions, StackActions } from 'react-navigation';
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

function reset(routeName, params, navigator) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })],
  });
  // in case _navigator is not yet ready, provide navigator
  if (!navigator) {
    _navigator.dispatch(resetAction);
  } else {
    navigator.dispatch(resetAction);
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  openDrawer,
  reset
};
