import { expect } from 'chai';
const guessthenumber = require('../src/guessthenumber');
const guessTheNumber = guessthenumber.guessTheNumber;

describe('guessTheNumber', function() {

  it('is a function', function() {
    expect(guessTheNumber).a('function');
  });

  context('invalid arguments', function() {

    it('correct for 1 argument', function() {
      expect(guessTheNumber(3)).undefined;
    });

    it('correct for 2 arguments', function() {
      expect(guessTheNumber('the', 'number')).undefined;
    });

  });

});
