import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

const { widthHeader } = Dimensions.get('window');
const heightContainers = 70;

const styles = EStyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  leftContainerStyle: {
    flex: 1,
  },
  rightContainerStyle: {
    flex: 1,
  },
  leftButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  rightButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 15,
  },
  titleContainerSyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePageStyle: {
    color: 'white',
    fontSize: 17,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 14,
  },
});

EStyleSheet.build();

class Header extends React.Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.leftContainerStyle}>
        </View>
        <View style={styles.titleContainerSyle}>
          <Text style={styles.titlePageStyle}>{this.props.username}</Text>
        </View>
        <View style={styles.rightContainerStyle}>
        </View>
      </View>
    );
  }
}
export default connect(state => ({
  username: state.auth.username,
}))(Header);
