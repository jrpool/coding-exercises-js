import { expect } from 'chai';
import stringMeAlong from '../src/stringmealong';

describe('stringMeAlong', function() {

  it('is a function', function() {
    expect(stringMeAlong).to.be.a('function');
  });

  context('valid arguments', function() {

    it('correct for string with all characters identical', function() {
      const string = 'aaaaaaaaa';
      expect(stringMeAlong(string)).to.equal('aaaaaaaaa');
    });

    it('correct for string with all characters distinct', function() {
      const string = 'abcdefghi';
      expect(stringMeAlong(string)).to.equal('hi');
    });

    it('correct for string with tied qualifying substrings', function() {
      const string = 'e8.rr,,,,lll)(@#$$$$$nnps)';
      expect(stringMeAlong(string)).to.equal('$$$$$nn');
    });

    it('correct for string of length 1', function() {
      const string = 'a';
      expect(stringMeAlong(string)).to.equal('a');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(stringMeAlong(string)).to.equal('');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument', function() {
      expect(stringMeAlong(456)).to.be.undefined;
    });

    it('correct for array as argument', function() {
      expect(stringMeAlong(['this is wrong'])).to.be.undefined;
    });

    it('correct for object as argument', function() {
      expect(stringMeAlong({ string: 'this is wrong'})).to.be.undefined;
    });

    it('correct for missing argument', function() {
      expect(stringMeAlong()).to.be.undefined;
    });

    it('correct for excess arguments', function() {
      expect(stringMeAlong('this is correct', 'but not this')).to.be.undefined;
    });

  });

});
