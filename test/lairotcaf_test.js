import { expect } from 'chai';
import lairotcaf from '../src/lairotcaf';

describe('lairotcaf', function() {

  it('is a function', function() {
    expect(lairotcaf).to.be.a('function');
  });

  context('valid arguments', function() {

    it('correct for 1', function() {
      expect(lairotcaf(1)).to.equal('1 = 1!');
    });

    it('correct for 2', function() {
      expect(lairotcaf(2)).to.equal('2 = 2!');
    });

    it('correct for 3', function() {
      expect(lairotcaf(3)).to.equal('3 NONE');
    });

    it('correct for 6.0', function() {
      expect(lairotcaf(6.0)).to.equal('6 = 3!');
    });

    it('correct for 3628800', function() {
      expect(lairotcaf(3628800)).to.equal('3628800 = 10!');
    });

  });

  context('invalid arguments', function() {

    it('correct for 0', function() {
      expect(lairotcaf(0)).to.be.undefined;
    });

    it('correct for negative integers', function() {
      expect(lairotcaf(-6)).to.be.undefined;
    });

    it('correct for nonintegers', function() {
      expect(lairotcaf(6.1)).to.be.undefined;
    });

    it('correct for string as argument', function() {
      expect(lairotcaf('6')).to.be.undefined;
    });

    it('correct for array as argument', function() {
      expect(lairotcaf([6])).to.be.undefined;
    });

    it('correct for object as argument', function() {
      expect(lairotcaf({a: 6})).to.be.undefined;
    });

    it('correct for excess arguments', function() {
      expect(lairotcaf(6, true)).to.be.undefined;
    });

    it('correct for missing argument', function() {
      expect(lairotcaf()).to.be.undefined;
    });

  });

});
