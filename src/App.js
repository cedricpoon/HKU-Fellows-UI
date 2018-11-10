import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { PostScrollable, PreviewFooter } from 'hkufui/components';
import posts from 'hkufui/pseudo/database/posts.json';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header />
          <Content>
            <PostScrollable posts={posts} />
          </Content>
          <PreviewFooter />
        </Container>
      </StyleProvider>
    );
  }
}
