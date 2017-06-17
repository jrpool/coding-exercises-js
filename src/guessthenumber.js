// Import the readline module.
const rl = require('readline-sync');

/*
  Function that conducts a guess-a-random-number game on standard I/O and
  export statement making that function the default export from this module.
  Enforced argument requirements:
    0. The argument count is 0.
*/
const guessTheNumber = function() {
  // If the arguments are valid:
  if (arguments.length === 0) {
    // Identify a random integer between 1 and 100, inclusive, as a target.
    const target = Math.floor(Math.random() * 100 + 1);
    // Initialize the guess count.
    let guesses = 0;
    // Initialize the prompt.
    let prompt = 'I am thinking of an integer from 1 through 100. Guess: ';
    // Until the game ends, increment the guess count and:
    while (++guesses > 0) {
      // Ask for a guess and identify it.
      let guess = rl.question(prompt);
      // If the user asked to exit:
      if (guess === 'exit') {
        // Quit.
        return;
      }
      /*
        Otherwise, if the guess is not a string representing a nonnegative
        integer:
      */
      else if (! /^\d+$/.test(guess)) {
        // Revise the error message.
        prompt = 'Your guess must be an integer. Try again: ';
      }
      /*
        Otherwise, i.e. if the guess is a string representing a nonnegative
        integer:
      */
      else {
        // Identify the integer.
        guess = Number.parseInt(guess, 10);
        // If it is too large:
        if (guess > target) {
          // Revise the error message.
          prompt = 'Your guess is too large. Try again: ';
        }
        // Otherwise, if it is too small:
        else if (guess < target) {
          // Revise the error message.
          prompt = 'Your guess is too small. Try again: ';
        }
        // Otherwise, i.e. if it is correct:
        else {
          // Output a success message.
          console.log(
            'Congratulations! You won on guess number ' + guesses + '!'
          );
          // Quit.
          return;
        }
      }
    }
  }
};

module.exports.guessTheNumber = guessTheNumber;
