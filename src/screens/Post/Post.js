import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import PostHeaderMenu from './PostHeaderMenu/PostHeaderMenu';
import { mapLayoutToState } from 'hkufui/components/helper';
import { Header, PostFooter } from 'hkufui/components';
import styles from './Styles';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', headerLayout: { y: 0, height: 0 } };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
  }

  _openHeaderMenu() {
    if (this._popup)
      this._popup.toggle();
  }

  _renderHeaderMenu() {
    const { headerLayout } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <PostHeaderMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
      />
    );
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
    const { title, subTitle, native } = this.state;

    return (
      <Container>
        {this._renderHeaderMenu()}
        <Header
          title={{
            context: title,
            numberOfLines: 4,
            color: native ? styles.nativeTitle.color : styles.moodleTitle.color
          }}
          subtitle={subTitle && {
            context: subTitle,
            numberOfLines: 3
          }}
          backable
          rightIcon='more'
          onRightPress={this._openHeaderMenu}
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        <Content>
        </Content>
        <PostFooter firstPage />
      </Container>
    );
  }
}

Post.propTypes = {

}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));
