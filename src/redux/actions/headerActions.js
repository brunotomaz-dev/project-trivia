export const GET_GRAVATAR = 'GET_GRAVATAR';

const actionGetGravatar = (hash) => ({
  type: GET_GRAVATAR,
  gravatarEndPoint: `https://www.gravatar.com/avatar/${hash}`,
});

export default actionGetGravatar;
