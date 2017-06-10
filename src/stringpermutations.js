/*
  Function declaration for permute.
  Preconditions:
    0. The argument count is 1.
    1. array is an array of 1-character strings.
*/
const permute = (array) => {
  // If array is empty:
  if (! array.length) {
    // Return an array of 1 empty array.
    return [[]];
  }
  // Otherwise, i.e. if array is nonempty:
  else {
    // Initialize its permutations as an empty array.
    let permutations = [];
    // For each character in array:
    for (let i = 0; i < array.length; i++) {
      // Identify a copy of array.
      const rest = array.slice();
      // Remove that character from the copy and identify the character.
      const first = rest.splice(i, 1)[0];
      /*
        Append to array’s permutations all the permutations of the array
        that begin with that character.
      */
      permutations = permutations.concat(permute(rest).map(
        (currentValue) => {
          currentValue.unshift(first);
          return currentValue;
        }
      ));
    }
    // Return all of array’s permutations.
    return permutations;
  }
};

/*
  Function declaration for stringPermutations and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 1.
    1. string is a string.
*/
export default function stringPermutations(string) {
  // If the arguments are valid:
  if (arguments.length === 1 && typeof string === 'string') {
    /*
      Identify an array of the unique characters in the string, in the
      order of their first appearance.
    */
    const uniques = string.split('').filter(
      (element, index, array) => {
        return ! array.slice(0, index).includes(element);
      }
    );
    // Identify an array of their permutations.
    const permutations = permute(uniques);
    // Return it as a newline-delimited string.
    return permutations.map(
      (currentValue) => {
        return currentValue.join('') + '\n';
      }
    ).join('');
  }
}
