import React from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from '../pages/Login';
import Gallery from '../pages/Gallery';
import ApproveList from '../pages/ApproveList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

EStyleSheet.build();

class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar hideTabBar>
            <Scene key="login" component={Login} />
            <Scene key="gallery" component={Gallery} panHandlers={null} />
            <Scene key="approvelist" component={ApproveList} panHandlers={null} />
          </Scene>
        </Router>
      </View>
    );
  }
}
export default connect()(Root);
