import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-deck-swiper';
import { Actions } from 'react-native-router-flux';

import * as imagesActions from '../redux/images';
import * as authActions from '../redux/auth';

import Header from '../components/Header';
import Card from '../components/Card';

import colors from '../constants/colors';

const displayWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: displayWidth - 50,
    height: 40,
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 14,
    borderRadius: 7,
    marginBottom: 20,
  },
  button: {
    width: displayWidth - 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    backgroundColor: colors.blueColor,
  },
  buttonTitle: {
    fontSize: 15,
    color: colors.whiteColor,
  },
});

EStyleSheet.build();

class Gallery extends Component {

  static defaultProps = {
    images: [],
    approvedImages: [],
    disapprovedImages: [],
    dispatch: () => {},
  };

  static propTypes = {
    images: React.PropTypes.arrayOf(React.PropTypes.object),
    approvedImages: React.PropTypes.arrayOf(React.PropTypes.object),
    disapprovedImages: React.PropTypes.arrayOf(React.PropTypes.object),
    dispatch: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  setApprovedOrDisapprovedImage = (cardIndex, flag) => {
    const { images } = this.props;
    if (flag === 'right') {
      this.props.dispatch(imagesActions.setApprovedImage(images[cardIndex]));
    } else {
      this.props.dispatch(imagesActions.setDisapprovedImage(images[cardIndex]));
    }
    if (images[cardIndex + 1]) {
      this.props.dispatch(imagesActions.setReddit(images[cardIndex + 1].data.name));
    }
  }

  logOut = () => {
    this.props.dispatch(imagesActions.cleanImages());
    this.props.dispatch(authActions.cleanAuth());
    Actions.pop();
  }

  openListApprovedImages = () => {
    Actions.approvelist();
  }

  render() {
    const { images, approvedImages, disapprovedImages } = this.props;
    let listImages = images.filter(x => approvedImages.indexOf(x) < 0);
    listImages = listImages.filter(x => disapprovedImages.indexOf(x) < 0);
    return (
      <View style={styles.mainContainer}>
        <Swiper
          marginTop={80}
          cards={listImages}
          renderCard={card => <Card card={(card) && card.data} />}
          overlayLabels={{
            left: {
              title: 'Nope',
              swipeColor: '#FF6C6C',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
            right: {
              title: 'Like',
              swipeColor: '#4CCC93',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
          }}
          onSwipedAll={() => Actions.approvelist()}
          cardIndex={0}
          backgroundColor={colors.whiteColor}
          onSwipedRight={cardIndex => this.setApprovedOrDisapprovedImage(cardIndex, 'right')}
          onSwipedLeft={cardIndex => this.setApprovedOrDisapprovedImage(cardIndex, 'left')}
          disableTopSwipe
          disableBottomSwipe
        />
        <Header
          absolute
          openListApprovedImages={this.openListApprovedImages}
          leftAction={this.logOut}
        />
      </View>
    );
  }
}

export default connect(state => ({
  images: state.images.images,
  approvedImages: state.images.approvedImages,
  disapprovedImages: state.images.disapprovedImages,
}))(Gallery);
