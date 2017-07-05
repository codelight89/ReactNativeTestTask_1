import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Platform,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-deck-swiper';
import {Spinner} from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

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
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

EStyleSheet.build();

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Swiper
          cardVerticalMargin={80}
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
              </View>
            )
          }}
          overlayLabels={{
            // bottom: {
            //   title: 'BLEAH',
            //   swipeColor: '#9262C2',
            //   backgroundOpacity: '0.75',
            //   fontColor: '#FFF'
            // },
            left: {
              title: 'NOPE',
              swipeColor: '#FF6C6C',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
            right: {
              title: 'LIKE',
              swipeColor: '#4CCC93',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
            // top: {
            //   title: 'SUPER LIKE',
            //   swipeColor: '#4EB8B7',
            //   backgroundOpacity: '0.75',
            //   fontColor: '#FFF'
            // }
          }}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          cardIndex={0}
          backgroundColor={'white'}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
        </Swiper>
        <View style={{ width: displayWidth, height: 50, backgroundColor: 'blue', position: 'absolute', top: 0, left: 0 }}/>
      </View>
    );
  }
}

export default connect()(Gallery);