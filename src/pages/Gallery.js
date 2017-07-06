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
    backgroundColor: 'blue',
  },
  buttonTitle: {
    fontSize: 15,
    color: 'white',
  },
});

EStyleSheet.build();

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openListApprovedImages = () => {
    this.props.dispatch(imagesActions.cleanListImages());
    Actions.approvelist();
  }

  logOut = () => {
    this.props.dispatch(imagesActions.cleanImages());
    this.props.dispatch(authActions.cleanAuth());
    Actions.pop();
  }

  render() {
    const { images } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Swiper
          marginTop={80}
          cards={images}
          renderCard={(card) => {
            return (
              <Card
                card={(card) && card.data}
              />
            );
          }}
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
          backgroundColor={'white'}
          onSwipedRight={(cardIndex) => {
            this.props.dispatch(imagesActions.setApprovedImage(images[cardIndex]));
          }}
          onSwipedLeft={(cardIndex) => {
            this.props.dispatch(imagesActions.setDisapprovedImage(images[cardIndex]));
          }}
          disableTopSwipe
          disableBottomSwipe
        >
        </Swiper>
        <Header
          absolute
          openListApprovedImages={this.openListApprovedImages}
          logOut={this.logOut}
        />
      </View>
    );
  }
}
Gallery.defaultProps = {
  images: [],
  dispatch: () => {},
};

Gallery.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.object),
  dispatch: () => {},
};
export default connect(state => ({
  images: state.images.images,
}))(Gallery);
