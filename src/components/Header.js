import React, { Component } from 'react';
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
import colors from '../constants/colors';

const widthHeader = Dimensions.get('window').width;
const heightContainers = (Platform.OS === 'ios') ? 70 : 50;

const styles = EStyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  absolute: {
    width: widthHeader,
    height: heightContainers,
    backgroundColor: colors.blueColor,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
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
    paddingLeft: 15,
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
  title: {
    color: colors.whiteColor,
    fontSize: 17,
  },
  subTitle: {
    color: colors.whiteColor,
    fontSize: 15,
  },
  buttonTitle: {
    color: colors.whiteColor,
    fontSize: 12,
  },
});

EStyleSheet.build();

class Header extends Component {

  render() {
    const { reddit, username, absolute } = this.props;
    return (
      <View style={absolute ? styles.absolute : styles.containerStyle}>
        <View style={styles.leftContainerStyle}>
          {
            (absolute) ?
              <TouchableOpacity
                style={styles.leftButtonStyle}
                onPress={() => this.props.openListApprovedImages()}
              >
                <Text style={styles.buttonTitle}>List Images</Text>
              </TouchableOpacity>
            :
              (this.props.rightAction) &&
                <TouchableOpacity
                  style={styles.leftButtonStyle}
                  onPress={() => this.props.rightAction()}
                >
                  <Text style={styles.buttonTitle}>Back</Text>
                </TouchableOpacity>
          }
        </View>
        <View style={styles.titleContainerSyle}>
          <Text style={styles.title}>{(absolute) ? reddit : username}</Text>
          <Text style={styles.subTitle}>{(absolute) && username}</Text>
        </View>
        <View style={styles.rightContainerStyle}>
          <TouchableOpacity
            style={styles.rightButtonStyle}
            onPress={() => this.props.leftAction()}
          >
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Header.defaultProps = {
  username: '',
  reddit: '',
  absolute: false,
  openListApprovedImages: () => {},
  leftAction: () => {},
  rightAction: () => {},
};

Header.propTypes = {
  username: React.PropTypes.string,
  reddit: React.PropTypes.string,
  absolute: React.PropTypes.bool,
  openListApprovedImages: React.PropTypes.func,
  leftAction: React.PropTypes.func,
  rightAction: React.PropTypes.func,
};

export default connect(state => ({
  username: state.auth.username,
  reddit: state.images.reddit,
}))(Header);
