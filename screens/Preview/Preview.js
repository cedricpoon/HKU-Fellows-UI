import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import { PostScrollable, PreviewFooter, PreviewHeader } from 'hkufui/components';
import postList from 'hkufui/docs/postList.json';

class Preview extends Component {

  render() {
    return (
      <Container>
        <PreviewHeader location={postList.location} />
        <Content>
          <PostScrollable posts={postList.posts} />
        </Content>
        <PreviewFooter />
      </Container>
    );
  }
}

export default Preview;
