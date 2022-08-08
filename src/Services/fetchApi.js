export const fetchApi = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const token = await response.json();
  return token;
};

export const fetchTrivia = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const trivia = await response.json();
  return trivia;
};
