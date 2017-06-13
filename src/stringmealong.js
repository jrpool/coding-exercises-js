/*
  Function declaration for stringMeAlong and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. Argument count is 1.
    1. string is a string.
*/
export default function stringMeAlong(string) {
  // If the arguments are valid:
  if (arguments.length === 1 && typeof string === 'string') {
    // Initialize the length of the longest qualifying substring found.
    let maxLength = 0;
    // Initialize the index of the start of that substring.
    let maxStart = 0;
    // For each character instance in the string:
    startLoop: for (let i = 0; i < string.length; i++) {
      /*
        If no substring starting there could be as long as the longest
        qualifying substring found yet:
      */
      if (string.length - i < maxLength) {
        // Stop looking for a longer qualifying substring.
        break;
      }
      /*
        Otherwise, i.e. if a substring starting there could be as long as the
        longest qualifying substring found yet:
      */
      else {
        /*
          The substring has been started. If this makes the substring at least
          as long as the previously longest substring:
        */
        if (maxLength < 2) {
          // Identify the length of the longest qualifying substring as 1.
          maxLength = 1;
          // Update the index of the start of that substring.
          maxStart = i;
        }
      }
      // Initialize a table of character types in the substring.
      const types = {};
      // Enter the substring’s starting character’s type into it.
      types[string[i]] = '';
      // For each subsequent character instance:
      for (let j = i + 1; j < string.length; j++) {
        // If it is not yet in the table:
        if (types[string[j]] === undefined) {
          // If it would not prevent the substring from being qualifying:
          if (Object.keys(types).length === 1) {
            // Add the instance’s type to the table.
            types[string[j]] = '';
          }
          /*
            Otherwise, i.e. if it would prevent the substring from being
            qualifying:
          */
          else {
            // Ignore the instance and stop trying to extend the substring.
            continue startLoop;
          }
        }
        /*
          The substring has been extended by 1 character. If this makes
          the substring at least as long as the previously longest substring:
        */
        if (j + 2 - i > maxLength) {
          // Update the length of the longest qualifying substring found.
          maxLength = j + 1 - i;
          // Update the index of the start of that substring.
          maxStart = i;
        }
      }
    }
    // Return the last of the longest qualifying substrings.
    return string.slice(maxStart, maxStart + maxLength);
  }
}
