/*
  Function declaration for fromFibonacci.
  Preconditions:
    0. Argument count is 1.
    1. string is a string of length 1 or more and composed of the
      characters “0” and/or “1”.
*/
const fromFibonacci = (string) => {
  /*
    Initialize the last 2 Fibonacci numbers, in order of increasing order
    of magnitude.
  */
  let lastTwo = [1, 0];
  // Return the result.
  return string.split('').reverse().reduce(
    (accumulator, currentValue) => {
      lastTwo = [lastTwo[1], lastTwo[0] + lastTwo[1]];
      return accumulator + (currentValue === '1' ? lastTwo[1] : 0);
    }, 0
  ).toString();
};

/*
  Function declaration for toFibonacci.
  Preconditions:
    0. Argument count is 1.
    1. number is a nonnegative integer.
*/
const toFibonacci = (number) => {
  // Initialize an array of Fibonacci numbers.
  const fibonaccis = [1, 1];
  let next;
  // As long as its highest-order element is smaller than number:
  while (fibonaccis[0] < number) {
    // Identify the next Fibonacci number.
    next = fibonaccis[0] + fibonaccis[1];
    // If it is no greater than number:
    if (next <= number) {
      // Prepend it to the array.
      fibonaccis.unshift(next);
    }
    else {
      break;
    }
  }
  // Initialize a cumulator.
  let sum = 0;
  // Identify an array of digits of the result.
  const binaries = fibonaccis.map(
    (currentValue) => {
      if (sum + currentValue <= number) {
        sum += currentValue;
        return 1;
      }
      else {
        return 0;
      }
    }
  );
  // If the array has length 2 or more and begins with 0:
  if (binaries.length > 1 && binaries[0] === 0) {
    // Remove the 0.
    binaries.shift();
  }
  // Return the result.
  return binaries.join('');
};

/*
  Function declaration for fibonacciBases and export statement making that
  function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 1.
    1. specs is a string partitionable into 3 substrings:
      1.0. Either “decimal” or “fib”.
      1.1. “ ” (a space).
      1.2. String representation of a nonnegative integer, which may be
        0-padded, and, if 1.0 is “fib”, is binary (all digits are 0 or 1).
*/
export default function fibonacciBases(specs) {
  // If the arguments are valid:
  if (
    arguments.length === 1
    && typeof specs === 'string'
    && /^decimal \d+$|^fib [01]+$/.test(specs)
  ) {
    // Identify the string representation of the number to be converted.
    const number = specs.replace(/^.+ /, '');
    // Return the conversion.
    return specs[0] === 'd' ?
      toFibonacci(Number.parseInt(number)) : fromFibonacci(number);
  }
}
