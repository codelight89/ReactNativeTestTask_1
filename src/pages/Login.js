import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-loading-spinner-overlay';

import * as auth from '../redux/auth';
import * as images from '../redux/sagas/images/images';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: 'Test',
      password: 'password',
    };
  }

  logInButtonPress = () => {
    this.setState({ loading: true });
    const { username, password } = this.state;
    if (username.length > 0 && password.length > 0) {
      if (password === 'password') {
        this.props.dispatch(auth.authSetUsername(username));
        this.props.dispatch(images.apiGetImages((success) => {
          if (success) {
            this.setState({ loading: false });
            Actions.gallery();
          }
        }));
      } else {
        this.setState({ loading: false }, () => {
          this.showMessageAlert('Your password is invalid');
        });
      }
    } else {
      this.setState({ loading: false }, () => {
        this.showMessageAlert('Please fill all fields');
      });
    }
  }

  showMessageAlert = (message) => {
    Alert.alert('Error', message,
      [{ text: 'OK' }]);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.mainContainer}>
          <Spinner visible={this.state.loading} overlayColor={'transparent'} color={'gray'} />
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={'Username'}
              underlineColorAndroid={'#00000000'}
              onChangeText={text => this.setState({ username: text })}
              placeholderTextColor={'black'}
              value={this.state.username}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Password'}
              underlineColorAndroid={'#00000000'}
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              placeholderTextColor={'black'}
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.logInButtonPress()}
          >
            <Text style={styles.buttonTitle}>Log In</Text>
          </TouchableOpacity>
          {
            (Platform.OS === 'ios') &&
              <KeyboardSpacer />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Login.defaultProps = {
  dispatch: () => {},
};

Login.propTypes = {
  dispatch: () => {},
};
export default connect()(Login);
