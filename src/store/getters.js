const getters = {
  templateType: state => state.template.type,
  templateVersion: state => state.template.version,
  templateVersionNumber: state => state.template.versionNumber,
  lang: state => state.lang,
  token: state => state.user.token,
  isAccessed: state => state.user.isAccessed,
  account: state => state.user.account,
  pointAmount: state => state.user.pointAmount,
  level: state => state.user.level,
  washcodeAmount: state => state.user.washcodeAmount,
};
export default getters;
