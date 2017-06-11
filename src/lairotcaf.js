/*
  Function declaration for lairotcaf and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. Argument count is 1.
    1. number is a positive integer.
*/
export default function lairotcaf(number) {
  // If the arguments are valid:
  if (
    arguments.length === 1
    && typeof number === 'number'
    && number > 0
    && Math.ceil(number) === Math.floor(number)
  ) {
    // Initialize the current integer as 1.
    let integer = 1;
    // Initialize the current factorial as 1.
    let factorial = 1;
    // As long as the last computed factorial is less than number:
    while (factorial < number) {
      // Increment the current integer and the current factorial.
      factorial *= ++integer;
    }
    // If the current factorial is number:
    if (factorial === number) {
      // Return a successful result.
      return number + ' = ' + integer + '!';
    }
    // Otherwise, i.e. if the current factorial is greater than number:
    else {
      // Return an unsuccessful result.
      return number + ' NONE';
    }
  }
}
