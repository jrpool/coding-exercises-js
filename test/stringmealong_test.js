import { expect } from 'chai';
import stringMeAlong from '../src/stringmealong';

describe('stringMeAlong', function() {

  it('is a function', function() {
    expect(stringMeAlong).a('function');
  });

  context('valid arguments', function() {

    it('correct for string with all characters identical', function() {
      const string = 'aaaaaaaaa';
      expect(stringMeAlong(string)).equal('aaaaaaaaa');
    });

    it('correct for string with all characters distinct', function() {
      const string = 'abcdefghi';
      expect(stringMeAlong(string)).equal('hi');
    });

    it('correct for string with tied qualifying substrings', function() {
      const string = 'e8.rr,,,,lll)(@#$$$$$nnps)';
      expect(stringMeAlong(string)).equal('$$$$$nn');
    });

    it('correct for string of length 1', function() {
      const string = 'a';
      expect(stringMeAlong(string)).equal('a');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(stringMeAlong(string)).equal('');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument', function() {
      expect(stringMeAlong(456)).undefined;
    });

    it('correct for array as argument', function() {
      expect(stringMeAlong(['this is wrong'])).undefined;
    });

    it('correct for object as argument', function() {
      expect(stringMeAlong({ string: 'this is wrong'})).undefined;
    });

    it('correct for missing argument', function() {
      expect(stringMeAlong()).undefined;
    });

    it('correct for excess arguments', function() {
      expect(stringMeAlong('this is correct', 'but not this')).undefined;
    });

  });

});
