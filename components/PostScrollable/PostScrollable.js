import React, { Component } from 'react';
import PropTypes from "prop-types";
import { ListItem, Body, Text, Icon } from 'native-base';
import { FlatList } from 'react-native';

import { localize } from 'hkufui/locale';
import Post from './PostPreview/PostPreview';
import styles from './Styles';

const locale = localize({ language: 'en', country: 'hk' });

class PostScrollable extends Component {

  _renderPost({item}) {
    return (
      <Post
        id={item.id}
        {...item}
      />
    );
  }

  _renderEmpty() {
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
    const { posts, ...restProps } = this.props

    if (this.props.posts.length > 0) {
      return (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={this._renderPost}
          {...restProps}
        />
      );
    } else {
      return this._renderEmpty();
    }
  }
}

PostScrollable.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostScrollable;
