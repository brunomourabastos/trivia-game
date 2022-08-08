import { TRIVIA_CONTENT } from '../Actions/Actions';

const INITIAL_STATE = {
  content: [],
};

export default function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TRIVIA_CONTENT:
    return {
      ...state,
      content: [action.triviaGame],
    };
  default:
    return {
      ...state,
    };
  }
}
