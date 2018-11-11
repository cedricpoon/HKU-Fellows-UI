import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { Container, Content, StyleProvider, Root } from 'native-base';
import { PostScrollable, PreviewFooter, PreviewHeader } from 'hkufui/components';
import postList from 'hkufui/docs/postList.json';

export default class App extends Component {
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme()}>
          <Container>
            <PreviewHeader location={postList.location} />
            <Content>
              <PostScrollable posts={postList.posts} />
            </Content>
            <PreviewFooter />
          </Container>
        </StyleProvider>
      </Root>
    );
  }
}
