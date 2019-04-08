import { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';

import { universalLink, deepLink } from 'hkufui/config';

const extractVariable = (url) => {
  return url.replace(`${universalLink.domain}${universalLink.post('')}`, '');
}

export default class UniversalLink extends Component {
  _resetStackToProperRoute = (url) => {
    if (url && url.startsWith(universalLink.domain)) {
      const topicId = extractVariable(url);
      Linking.openURL(`${deepLink.prefix}${deepLink.post(topicId)}`);
    }
  }

  _appWokeUp = (event) => {
    this._resetStackToProperRoute(event.url)
  }

  async componentDidMount() {
    try {
      const url = await Linking.getInitialURL();
      if (url) {
        this._resetStackToProperRoute(url);
      }
    } catch (e) { /* ignored */ }

    Linking.addEventListener('url', this._appWokeUp);
  }

  componentWillUnmount(){
    Linking.removeEventListener('url', this._appWokeUp);
  }

  render() {
    return this.props.children;
  }
}

UniversalLink.propTypes = {
  children: PropTypes.any.isRequired
};
