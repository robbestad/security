let emailRe =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]*|[.]{1}[a-z0-9]+))+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]+)$/i;

export default function ValidateEmail(input: string) {
  return input.match(emailRe);
}
