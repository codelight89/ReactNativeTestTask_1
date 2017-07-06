export const SET_IMAGES = 'SET_IMAGES';
export const SET_APPROVED_IMAGE = 'SET_APPROVED_IMAGE';
export const SET_DISAPPROVED_IMAGE = 'SET_DISAPPROVED_IMAGE';
export const SET_REDDIT = 'SET_REDDIT';
export const CLEAN_LIST_IMAGES = 'CLEAN_LIST_IMAGES';
export const CLEAN_IMAGES = 'CLEAN_IMAGES';

export const setImages = data => ({
  type: SET_IMAGES,
  data,
});

export const setApprovedImage = data => ({
  type: SET_APPROVED_IMAGE,
  data,
});

export const setDisapprovedImage = data => ({
  type: SET_DISAPPROVED_IMAGE,
  data,
});

export const setReddit = data => ({
  type: SET_REDDIT,
  data,
});

export const cleanImages = () => ({
  type: CLEAN_IMAGES,
});

export const cleanListImages = () => ({
  type: CLEAN_LIST_IMAGES,
});

const initialState = {
  images: [],
  reddit: '',
  approvedImages: [],
  disapprovedImages: [],
};

export default (_state = initialState, action = {}) => {
  const state = { ..._state };
  switch (action.type) {
    case SET_IMAGES:
      state.images = action.data;
      break;
    case SET_APPROVED_IMAGE:
      const appImages = state.approvedImages;
      appImages.push(action.data);
      state.approvedImages = appImages;
      break;
    case SET_DISAPPROVED_IMAGE:
      const disappImages = state.disapprovedImages;
      disappImages.push(action.data);
      state.disapprovedImages = disappImages;
      break;
    case SET_REDDIT:
      state.reddit = action.data;
      break;
    case CLEAN_IMAGES:
      state.images = [];
      state.approvedImages = [];
      state.disapprovedImages = [];
      state.reddit = '';
      break;
    case CLEAN_LIST_IMAGES:
      // const listImages = state.images.filter(function(x) {
      //    return state.approvedImages.indexOf(x) < 0;
      //  });
      // state.images = listImages;
      break;
    default:
      break;
  }
  return state;
};
