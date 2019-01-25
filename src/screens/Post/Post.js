import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostHeaderMenu from './PostHeaderMenu/PostHeaderMenu';
import { mapLayoutToState } from 'hkufui/components/helper';
import { Header, PostFooter, PostSwipable } from 'hkufui/components';
import styles from './Styles';

// MOCK
import MOCK_POSTS from 'hkufui/static/mock/posts';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currentPage: 0,
      headerLayout: { y: 0, height: 0 }
    };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
    this._onPostTabChange = this._onPostTabChange.bind(this);
  }

  _openHeaderMenu() {
    if (this._popup)
      this._popup.toggle();
  }

  _renderHeaderMenu() {
    const { headerLayout, native, solved, currentPage } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <PostHeaderMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
        native={native}
        solved={solved != null}
        index={currentPage + 1}
      />
    );
  }

  _onPostTabChange({i}) {
    this.setState({ currentPage: i });
  }

  componentDidMount() {
    const { navigation } = this.props;
    /* all props from <PostPreview /> has been passed */
    if (navigation) {
      this.setState({
        ...navigation.state.params
      });
    }
  }

  render() {
    const { title, subtitle, native, solved, currentPage } = this.state;
    const { comments } = this.props;

    return (
      <Container>
        {this._renderHeaderMenu()}
        <Header
          title={{
            context: title,
            numberOfLines: 4,
            color: native ? styles.nativeTitle.color : styles.moodleTitle.color
          }}
          subtitle={subtitle && {
            context: subtitle,
            numberOfLines: 3
          }}
          animated={false}
          backable
          rightIcon='more'
          onRightPress={this._openHeaderMenu}
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        <PostSwipable
          comments={comments}
          onChangeTab={this._onPostTabChange}
          onRef={ref => this._postTabs = ref}
          solved={solved}
        />
        <PostFooter
          firstPage={!comments || currentPage === 0}
          lastPage={!comments || currentPage === comments.length - 1 || comments.length === 0}
          onPageChangeThunk={(i) => {
            if (this._postTabs)
              return () => { this._postTabs.goToPage(currentPage + i) };
          }}
        />
      </Container>
    );
  }
}

Post.defaultProps = {
  comments: MOCK_POSTS
}

Post.propTypes = {
  comments: PropTypes.array
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));
