export const SET_USERNAME = 'AUTH_SET_USERNAME';
export const AUTH_CLEAN = 'AUTH_CLEAN';

export const authSetUsername = data => ({
  type: SET_USERNAME,
  data,
});

export const cleanAuth = () => ({
  type: AUTH_CLEAN,
});

const initialState = {
  username: '',
};

export default (_state = initialState, action = {}) => {
  const state = { ..._state };
  switch (action.type) {
    case SET_USERNAME: {
      state.username = action.data;
      break;
    }
    case AUTH_CLEAN: {
      state.username = '';
      break;
    }
    default:
      break;
  }
  return state;
};
