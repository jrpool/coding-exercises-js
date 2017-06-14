import { expect } from 'chai';
import lairotcaf from '../src/lairotcaf';

describe('lairotcaf', function() {

  it('is a function', function() {
    expect(lairotcaf).a('function');
  });

  context('valid arguments', function() {

    it('correct for 1', function() {
      expect(lairotcaf(1)).equal('1 = 1!');
    });

    it('correct for 2', function() {
      expect(lairotcaf(2)).equal('2 = 2!');
    });

    it('correct for 3', function() {
      expect(lairotcaf(3)).equal('3 NONE');
    });

    it('correct for 6.0', function() {
      expect(lairotcaf(6.0)).equal('6 = 3!');
    });

    it('correct for 3628800', function() {
      expect(lairotcaf(3628800)).equal('3628800 = 10!');
    });

  });

  context('invalid arguments', function() {

    it('correct for 0', function() {
      expect(lairotcaf(0)).undefined;
    });

    it('correct for negative integers', function() {
      expect(lairotcaf(-6)).undefined;
    });

    it('correct for nonintegers', function() {
      expect(lairotcaf(6.1)).undefined;
    });

    it('correct for string as argument', function() {
      expect(lairotcaf('6')).undefined;
    });

    it('correct for array as argument', function() {
      expect(lairotcaf([6])).undefined;
    });

    it('correct for object as argument', function() {
      expect(lairotcaf({a: 6})).undefined;
    });

    it('correct for excess arguments', function() {
      expect(lairotcaf(6, true)).undefined;
    });

    it('correct for missing argument', function() {
      expect(lairotcaf()).undefined;
    });

  });

});
