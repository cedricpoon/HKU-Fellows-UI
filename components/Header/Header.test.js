import React from 'react';
import { StyleSheet } from 'react-native';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Testing Header Component', () => {
  it('renders as expected with title', () => {
    const wrapper = shallow(
      <Header title={{ context: 'header' }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with back button', () => {
    const wrapper = shallow(
      <Header title={{ context: 'header' }} backable />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subtitle', () => {
    const wrapper = shallow(
      <Header title={{ context: 'header' }} subtitle={{ context: 'header' }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subtitle and regarding line numbers', () => {
    const wrapper = shallow(
      <Header
        title={{ context: 'header', numberOfLines: 2 }}
        subtitle={{ context: 'header', numberOfLines: 2 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with right button', () => {
    const wrapper = shallow(
      <Header title={{ context: 'header' }} rightIcon="arrow-dropup" onRightPress={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has right style', () => {
    const wrapper = shallow(
      <Header title={{ context: 'header' }} rightIcon='arrow-dropup' rightStyle={StyleSheet.create({})} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without animation', () => {
    const wrapper = shallow(
      <Header
        title={{ context: 'header' }}
        subtitle={{ context: 'header' }}
        animated={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
