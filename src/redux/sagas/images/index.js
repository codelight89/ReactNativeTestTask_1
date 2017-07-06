import { fork } from 'redux-saga/effects';
import {
  fetchImagesFork,
} from './images';

export default function* () {
  yield fork(fetchImagesFork);
}
