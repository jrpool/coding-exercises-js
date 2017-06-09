import { expect } from 'chai';
import parens from '../src/parens';

describe('parens', function() {

  it('is a function', function() {
    expect(parens).to.be.a('function');
  });

  context('valid arguments', function() {

    it('correct for no parentheses', function() {
      const string = 'E=mc²';
      expect(parens(string)).to.equal('E=mc²');
    });

    it('correct for balanced unnested parentheses', function() {
      const string = 'any (old) five (5) things';
      expect(parens(string)).to.equal('any (old) five (5) things');
    });

    it('correct for balanced adjacent but unnested parentheses', function() {
      const string = '(see (Smith (1993)))';
      expect(parens(string)).to.equal('(see (Smith (1993)))');
    });

    it('correct for balanced nested parentheses', function() {
      const string = 'akvo ((water (H₂O)))';
      expect(parens(string)).to.equal('akvo (water (H₂O))');
    });

    it('correct for balanced mustiply nested parentheses', function() {
      const string = 'akvo (((water (H₂O))))';
      expect(parens(string)).to.equal('akvo (water (H₂O))');
    });

    it('correct for string with quasi-parentheses', function() {
      const string = 'ak⁾vo (（(water [[(H₂O)]])）)';
      expect(parens(string)).to.equal('ak⁾vo (（(water [[(H₂O)]])）)');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(parens(string)).to.equal('');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument 0', function() {
      expect(parens(456)).to.be.undefined;
    });

    it('correct for array as argument 0', function() {
      expect(parens(['this is wrong'])).to.be.undefined;
    });

    it('correct for excess arguments', function() {
      expect(parens('this is ok', 'not this')).to.be.undefined;
    });

    it('correct for no arguments', function() {
      expect(parens()).to.be.undefined;
    });

    it('correct for unbalanced parentheses', function() {
      expect(parens('1) Oakland; 2) Berkeley')).to.be.undefined;
    });

  });

});