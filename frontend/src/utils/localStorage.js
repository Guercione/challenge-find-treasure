const _match = "_match";
const _userName = "_username";

export const setMatch = (matchObject) => {
  return localStorage.setItem(_match, JSON.stringify(matchObject) || {});
};

export const getMatch = () => {
  return JSON.parse(localStorage.getItem(_match) || "{}");
};

export const deletetMatch = () => {
  return JSON.parse(localStorage.removeItem(_match));
};

export const setUserName = (userName) => {
  return localStorage.setItem(_userName, userName);
};

export const getUserName = () => {
  return localStorage.getItem(_userName);
};
