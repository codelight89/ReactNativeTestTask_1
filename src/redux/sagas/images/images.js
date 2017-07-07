import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as imagesActions from '../../images';
import * as Query from '../../../utils/query';

export const GET_IMAGES = 'GET_IMAGES';

export const apiGetImages = callback => ({
  type: GET_IMAGES,
  callback,
});

function* fetchImages(data) {
  try {
    const result = yield Query.imagesQuery();
    if (result && Array.isArray(result.data.children)) {
      yield put(imagesActions.setImages(result.data.children));
      if (result.data.children.length > 0) {
        yield put(imagesActions.setReddit(result.data.children[0].data.name));
      }
      data.callback(true);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}

export function* fetchImagesFork() {
  yield* takeEvery(GET_IMAGES, fetchImages);
}
