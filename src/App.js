import React, { Component } from 'react';
import { Container, Header, Content } from 'native-base';
import PostScrollable from './PostScrollable/PostScrollable';
import posts from '../pseudo/database/posts.json';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <PostScrollable posts={posts} />
        </Content>
      </Container>
    );
  }
}
