import React, { Component } from 'react';
import PropTypes from "prop-types";
import { List, ListItem, Body, Text, Icon } from 'native-base';

import { localize } from '../../locale';
import Post from './PostPreview/PostPreview';
import styles from './Styles';

const locale = localize({ language: 'en', country: 'hk' });

class PostScrollable extends Component {

  renderPosts(posts) {
    return posts.map((post, i) => (
      <Post
        key={i}
        {...post}
      />
    ));
  }

  renderEmpty() {
    return (
      <ListItem itemDivider>
        <Body style={styles.noPost}>
          <Text>{locale['post.noPostTitle']}</Text>
          <Text note>
            {locale['post.noPostContent']}
            <Icon name="md-paper" style={[styles.mainText, styles.note]} />
          </Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <List>
        {this.props.posts.length > 0 ?
          this.renderPosts(this.props.posts)
        :
          this.renderEmpty()
        }
      </List>
    );
  }
}

PostScrollable.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostScrollable;
