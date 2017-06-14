import { expect } from 'chai';
import fibonacciBases from '../src/fibonaccibases';

describe('fibonacciBases', function() {

  it('is a function', function() {
    expect(fibonacciBases).a('function');
  });

  context('valid decimal arguments', function() {

    it('correct for 0', function() {
      expect(fibonacciBases('decimal 0')).equal('0');
    });

    it('correct for 0-padded integer', function() {
      expect(fibonacciBases('decimal 017')).equal('1001010');
    });

    it('correct for a Fibonacci number', function() {
      expect(fibonacciBases('decimal 13')).equal('1000000');
    });

    it('correct for a non-Fibonacci number', function() {
      expect(fibonacciBases('decimal 16')).equal('1001000');
    });

  });

  context('valid Fibonacci arguments', function() {

    it('correct for 0', function() {
      expect(fibonacciBases('fib 0')).equal('0');
    });

    it('correct for a Fibonacci number', function() {
      expect(fibonacciBases('fib 1000000')).equal('13');
    });

    it('correct for a non-Fibonacci number', function() {
      expect(fibonacciBases('fib 1001000')).equal('16');
    });

    it('correct for a 0-padded number', function() {
      expect(fibonacciBases('fib 001001000')).equal('16');
    });

  });

  context('invalid arguments', function() {

    it('correct for malformatted base specification', function() {
      expect(fibonacciBases('dec 13')).undefined;
    });

    it('correct for excess characters in argument', function() {
      expect(fibonacciBases('fib  1001010')).undefined;
    });

    it('correct for decimal argument with negative integer', function() {
      expect(fibonacciBases('decimal -13')).undefined;
    });

    it('correct for decimal argument with non-integer', function() {
      expect(fibonacciBases('decimal 13.33')).undefined;
    });

    it('correct for non-binary Fibonacci argument', function() {
      expect(fibonacciBases('fib 1101201')).undefined;
    });

    it('correct for number as argument', function() {
      expect(fibonacciBases(13)).undefined;
    });

    it('correct for array as argument', function() {
      expect(fibonacciBases(['decimal', 25])).undefined;
    });

    it('correct for excess arguments', function() {
      expect(fibonacciBases('decimal 25', 1)).undefined;
    });

    it('correct for missing argument', function() {
      expect(fibonacciBases()).undefined;
    });

  });

});
