const getters = {
  type: state => state.type,
  lang: state => state.lang,
  token: state => state.user.token,
};
export default getters;
