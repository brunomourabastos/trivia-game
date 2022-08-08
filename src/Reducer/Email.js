import { EMAIL_GRAVATAR, SCORE, UPDATE_HITS, RESET_SCORE } from '../Actions/Actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  hits: 0,
};

export default function player(state = INITIAL_STATE, action) {
  console.log(action.score);
  switch (action.type) {
  case EMAIL_GRAVATAR:
    return {
      ...state,
      gravatarEmail: action.state.email,
      name: action.state.nickName,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  case UPDATE_HITS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return {
      ...state,
    };
  }
}
