import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import * as authActions from '../redux/auth';
import * as imagesActions from '../redux/images';

const displayWidth = Dimensions.get('window').width;
const dislikeIcon = require('../resources/dislike_icon.png');
const likeIcon = require('../resources/like_icon.png');

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: displayWidth,
    height: 51,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    width: displayWidth - 80,
    marginLeft: 5,
    fontSize: 12,
    color: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  textLikesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

EStyleSheet.build();

class ApproveList extends Component {
  static defaultProps = {
    approvedImages: [],
    disapprovedImages: [],
    dispatch: () => {},
  };

  static propTypes = {
    approvedImages: React.PropTypes.arrayOf(React.PropTypes.object),
    disapprovedImages: React.PropTypes.arrayOf(React.PropTypes.object),
    dispatch: () => {},
  };

  constructor() {
    super();
    this.state = {
    };
  }

  logOut = () => {
    this.props.dispatch(imagesActions.cleanImages());
    this.props.dispatch(authActions.cleanAuth());
    Actions.login();
  }

  goBack = () => {
    Actions.pop();
  }

  renderRows = (rowData, sectionId, rowId) => {
    const { approvedImages } = this.props;
    return (
      <View style={styles.cell}>
        <Image
          style={styles.image}
          source={{ uri: rowData.data.thumbnail }}
          resizeMode="contain"
        />
        <View style={styles.textLikesContainer}>
          <Text style={styles.text} lineBreakMode="tail" numberOfLines={1}>{rowData.data.title}</Text>
          <Image
            source={(rowId > approvedImages.length - 1) ? dislikeIcon : likeIcon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { approvedImages, disapprovedImages } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header
          rightAction={this.goBack}
          leftAction={this.logOut}
        />
        <ListView
          style={styles.listView}
          dataSource={
            ds.cloneWithRows((approvedImages.length > 0 || disapprovedImages.length > 0) ?
              approvedImages.concat(disapprovedImages)
            :
              [])
          }
          renderRow={this.renderRows}
          enableEmptySections
        />
      </View>
    );
  }
}

export default connect(state => ({
  approvedImages: state.images.approvedImages,
  disapprovedImages: state.images.disapprovedImages,
}))(ApproveList);
