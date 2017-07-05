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
import * as auth from '../redux/auth';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSpinner: false,
      username: '',
      password: '',
    };
  }

  logInButtonPress = () => {
    const { username, password } = this.state;
    if (username.length > 0 && password.length > 0) {
      if (password === 'password') {
        this.props.dispatch(auth.authSetUsername(username));
        Actions.gallery();
      } else {
        this.showMessageAlert('Your password is invalid');
      }
    } else {
      this.showMessageAlert('Please fill all fields');
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
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={'Username'}
              underlineColorAndroid={'#00000000'}
              onChangeText={(text) => this.setState({ username: text })}
              placeholderTextColor={'black'}
              value={this.state.username}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Password'}
              underlineColorAndroid={'#00000000'}
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
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
          <KeyboardSpacer/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default connect()(Login);