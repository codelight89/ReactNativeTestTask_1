import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import colors from '../constants/colors';

const styles = EStyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
  },
  image: {
    flex: 1,
  },
});

EStyleSheet.build();

export default class Card extends Component {
  static defaultProps = {
    card: {},
  };

  static propTypes = {
    card: React.PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { card } = this.props;
    return (
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={{ uri: card.thumbnail }}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
      </View>
    );
  }
}
