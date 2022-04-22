export function isKorean(text) {
  var regExp = /^[가-힣]+$/;
  return regExp.test(text);
}
export default isKorean;
