/*
  Function declaration for parens and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 1.
    1. string is a string without unbalanced parentheses.
*/
export default function parens(string) {
  // If the arguments are superficially valid:
  if (
    arguments.length === 1
    && typeof string === 'string'
  ) {
    // Initialize a table of indices of pairs of parentheses in string.
    const pairs = {};
    // Initialize an array of indices of balanced right parentheses.
    const rights = [];
    // Initialize an array of indices of parentheses to be deleted.
    const deletables = [];
    // For each index in the string:
    leftcheck: for (let i = 0; i < string.length; i++) {
      // If it is a left parenthesis:
      if (string[i] === '(') {
        // Initialize the count of needed prior right parentheses.
        let need = 0;
        // For each character after it:
        for (let j = i + 1; j < string.length; j++) {
          // If it is a left parenthesis:
          if (string[j] === '(') {
            // Increment the count of needed prior right parentheses.
            need++;
          }
          // Otherwise, if it is a right parenthesis:
          else if (string[j] === ')') {
            // If any prior right parenthesis is needed:
            if (need) {
              // Decrement the count of needed prior right parentheses.
              need--;
            }
            // Otherwise, i.e. if it and the left parenthesis are a pair:
            else {
              // Add the pair’s indices to the table of pair indices.
              pairs[i] = j;
              /*
                Add the right parenthesis’s index to the array of indices of
                balanced right parentheses.
              */
              rights.push(j);
              // If the pair is immediately inside another pair:
              if (pairs[i - 1] === j + 1) {
                // Mark the inside pair for deletion.
                deletables.push(i, j);
              }
              // Stop checking the characters after the left parenthesis.
              continue leftcheck;
            }
          }
        }
        // The left parenthesis is unbalanced. Quit and return a failure.
        return undefined;
      }
    }
    // All left parentheses are balanced. For each character in string:
    for (let k = 0; k < string.length; k++) {
      // If it is an unbalanced right parenthesis:
      if (string[k] === ')' && ! rights.includes(k)) {
        // Quit and return a failure.
        return undefined;
      }
    }
    /*
      All parentheses are balanced and all deletables are marked. Return
      string with the deletables deleted.
    */
    return string.split('').filter(
      (element, index) => {
        return ! deletables.includes(index);
      }
    ).join('');
  }
}
