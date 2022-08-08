export const getStorage = (string) => {
  const data = localStorage.getItem(string);
  return JSON.parse(data);
};

export const setStorage = (string, object) => {
  localStorage.setItem(string, JSON.stringify(object));
};
