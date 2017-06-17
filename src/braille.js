/** @fileOverview Conversion of a representation of Braille to ASCII.
* @author Jonathan Pool <pool@stulta.com>
* @version 0
*/

/** @module*/

/**
 * Function that performs the conversion.
 * Enforced argument requirements:
 *   0. Argument count is 1.
 *   1. dots is an array of 3 strings that each:
 *     1.1. are equal in length.
 *     1.2. consist of 1 or more single-space-delimited 2-dot rows.
 *     1.3. represent the top, middle, and bottom rows of Braille text.
 *     1.4. represent a raised dot with “O” and a lowered dot with “.”.
 *     1.5. are limited to the single letters a–z.
*/
export default function braille(dots) {
  // If the lines are superficially valid:
  if (
    arguments.length === 1
      && dots.length === 3
      && dots.every(
        (currentValue) => {return typeof currentValue === 'string';}
      )
      && dots.every(
        (currentValue, index, array) => {
          return array[index].length === array[0].length;
        }
      )
      && dots.every(
        (currentValue) => {
          return /^(?:(?:[O.]{2} )*[O.]{2})$/.test(currentValue);
        }
      )
  ) {
    // The lines are superficially valid. Transpose them into letter codes.
    const codeArrays = dots.map(
      (currentValue) => {
        return currentValue.split(' ');
      }
    );
    const letterCodes = codeArrays[0].map(
      function(currentValue, index) {
        return currentValue + this[1][index] + this[2][index];
      },
      codeArrays
    );
    // Initialize an array of the characters of the result.
    const resultArray = [];
    // Load the fs module.
    const fs = require('fs');
    /*
      Identify an array of lines from the Braille-to-ASCII letter converter file.
    */
    const converterLines
      = fs.readFileSync('./data/braille/converter.txt', 'utf8')
        .split('\n');
    // Identify a converter table based on them.
    const converter = {};
    for (const line of converterLines) {
      converter[line.slice(3)] = line[0];
    }
    // For each instance of a letter code in the argument:
    for (const code of letterCodes) {
      // Identify the letter that it represents.
      const letter = converter[code];
      // If there is none:
      if (letter === undefined) {
        // Return a failure.
        return undefined;
      }
      // Otherwise, i.e. if the code represents a letter:
      else {
        // Append the letter to the result array.
        resultArray.push(letter);
      }
    }
    // Return the result.
    return resultArray.join('');
  }
}
