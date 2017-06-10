import { expect } from 'chai';
import stringPermutations from '../src/stringpermutations';

describe('stringPermutations', function() {

  it('is a function', function() {
    expect(stringPermutations).to.be.a('function');
  });

  context('valid arguments', function() {

    it('correct for nonblank string', function() {
      const string = 'gimme';
      expect(stringPermutations(string)).to.equal(
        'gime\ngiem\ngmie\ngmei\ngeim\ngemi\n'
        + 'igme\nigem\nimge\nimeg\niegm\niemg\n'
        + 'mgie\nmgei\nmige\nmieg\nmegi\nmeig\n'
        + 'egim\negmi\neigm\neimg\nemgi\nemig\n'
      );
    });

    it('correct for single repeated character', function() {
      const string = '555';
      expect(stringPermutations(string)).to.equal('5\n');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(stringPermutations(string)).to.equal('\n');
    });

    it('correct for non-Latin script', function() {
      const string = '지어';
      expect(stringPermutations(string)).to.equal('지어\n어지\n');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument', function() {
      expect(stringPermutations(456)).to.be.undefined;
    });

    it('correct for array as argument', function() {
      expect(stringPermutations(['this is wrong'])).to.be.undefined;
    });

    it('correct for excess arguments', function() {
      expect(stringPermutations('this is wrong', 1)).to.be.undefined;
    });

    it('correct for no arguments', function() {
      expect(stringPermutations()).to.be.undefined;
    });

  });

});
