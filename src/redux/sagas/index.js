import { fork } from 'redux-saga/effects';
import images from './images';

function* root() {
  yield [
    fork(images),
  ];
}
export default root;
