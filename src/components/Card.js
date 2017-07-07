import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
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
        <Image
          style={styles.image}
          source={{ uri: card.thumbnail }}
          resizeMode="contain"
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
      </View>
    );
  }
}

Card.defaultProps = {
  card: {},
};

Card.propTypes = {
  card: React.PropTypes.object,
};
