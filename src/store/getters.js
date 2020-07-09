const getters = {
  templateType: state => state.template.type,
  templateVersion: state => state.template.version,
  templateVersionNumber: state => state.template.versionNumber,
  lang: state => state.lang,
  token: state => state.user.token,
};
export default getters;
