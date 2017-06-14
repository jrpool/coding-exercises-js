import { expect } from 'chai';
import disemvowling from '../src/disemvowling';

describe('disemvowling', function() {

  it('is a function', function() {
    expect(disemvowling).a('function');
  });

  context('valid arguments', function() {

    it('correct for string with no spaces', function() {
      const string = 'antidisestablishmentarianism';
      expect(disemvowling(string)).equal('ntdsstblshmntrnsm');
    });

    it('correct for string with solo spaces', function() {
      const string = 'this is a string with solo spaces';
      expect(disemvowling(string)).equal('thssstrngwthslspcs');
    });

    it('correct for string with adjacent spaces', function() {
      const string = 'this is a string with  adjacent   spaces';
      expect(disemvowling(string)).equal('thssstrngwthdjcntspcs');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(disemvowling(string)).equal('');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument 0', function() {
      expect(disemvowling(456)).undefined;
    });

    it('correct for array as argument 0', function() {
      expect(disemvowling(['this is wrong'])).undefined;
    });

    it('correct for excess arguments', function() {
      expect(disemvowling('this is ok', 'not this')).undefined;
    });

    it('correct for no arguments', function() {
      expect(disemvowling()).undefined;
    });

    it('correct for argument 0 with capital letters', function() {
      expect(disemvowling('This is wrong')).undefined;
    });

    it('correct for argument 0 with punctuation', function() {
      expect(disemvowling('This is “wrong”')).undefined;
    });

    it('correct for argument 0 with digits', function() {
      expect(disemvowling('there are 120 learners')).undefined;
    });

    it('correct for argument 0 with non-Latin letters', function() {
      expect(disemvowling('it is a great место')).undefined;
    });

  });

});
