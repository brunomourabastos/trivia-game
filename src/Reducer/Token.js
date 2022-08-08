import { TOKEN_CONTENT } from '../Actions/Actions';

const INITIAL_STATE = '';

export default function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN_CONTENT:
    return action.tokenRequest;
  default:
    return state;
  }
}
