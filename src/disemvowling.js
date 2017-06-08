/*
  Function declaration for disemvowling and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 1.
    1. string is a string composed only of letters a–z and spaces.
*/
export default function disemvowling(string) {
  // If the arguments are valid:
  if (
    arguments.length === 1
    && typeof string === 'string'
    && /^[a-z ]*$/.test(string)
  ) {
    // Return string without spaces and without vowels.
    return string.replace(/[aeiou ]/g, '');
  }
}
