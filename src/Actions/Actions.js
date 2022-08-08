import { fetchApi, fetchTrivia } from '../Services/fetchApi';

export const EMAIL_GRAVATAR = 'EMAIL_GRAVATAR';
export const emailGravatar = (state) => ({
  type: EMAIL_GRAVATAR,
  state,
});

export const TOKEN_CONTENT = 'TOKEN_CONTENT';
export const actionToken = (tokenRequest) => ({
  type: TOKEN_CONTENT,
  tokenRequest,
});

export const actionFetchToken = () => async (dispatch) => {
  const tokenRequest = await fetchApi();
  dispatch(actionToken(tokenRequest.token));
};

export const TRIVIA_CONTENT = 'TRIVIA_CONTENT';
export const actionTrivia = (triviaGame) => ({
  type: TRIVIA_CONTENT,
  triviaGame,
});

export const SCORE = 'SCORE';
export const saveScore = (score) => ({
  type: SCORE,
  score,
});

export const RESET_SCORE = 'RESET_SCORE';
export const resetScore = (score) => ({
  type: RESET_SCORE,
  score,
});

export const UPDATE_HITS = 'UPDATE_HITS';
export const updateHits = (assertions) => ({
  type: UPDATE_HITS,
  assertions,
});

export const actionFetchTrivia = (tokenRequest) => async (dispatch) => {
  const triviaGame = await fetchTrivia(tokenRequest);
  dispatch(actionToken(triviaGame));
};
