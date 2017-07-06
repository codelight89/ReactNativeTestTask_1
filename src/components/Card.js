import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = EStyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
  },
  title: {
    height: 50,
    textAlign: 'center',
    fontSize: 12,
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
        <Spinner visible={this.state.loading} overlayColor={'transparent'} color={'gray'} />
        <Image
          style={styles.image}
          source={{ uri: card.thumbnail }}
          resizeMode="contain"
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
        <Text style={styles.title}>{card.title}</Text>
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
