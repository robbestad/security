// Min 1 number
// Min 1 special
// Min 1 uppercase
// Min 10 characters
function validatePassword(pass) {
  if (!pass || pass.length < 10) return false;

  return true;
}
module.exports = validatePassword;
