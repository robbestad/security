var emailRe =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]*|[.]{1}[a-z0-9]+))+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]+)$/i;

function validateEmail(input) {
  return input.match(emailRe);
}

module.exports = validateEmail;
