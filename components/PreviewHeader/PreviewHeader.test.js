import React from 'react';
import { shallow } from 'enzyme';
import PreviewHeader from './PreviewHeader';

describe('Testing PreviewHeader Component', () => {
  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PreviewHeader location='' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('will search', () => {
    const wrapper = shallow(
      <PreviewHeader location='' onSearchThunk={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('will cancel', () => {
    const wrapper = shallow(
      <PreviewHeader location='' onCancel={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
