export const GET_GRAVATAR = 'GET_GRAVATAR';
export const SET_EMAIL = 'SET_EMAIL';

export const actionGetGravatar = (hash) => ({
  type: GET_GRAVATAR,
  payload: `https://www.gravatar.com/avatar/${hash}`,
});

export const actionSetEmail = (email, name) => ({
  type: SET_EMAIL,
  name,
  email,
});
