import { expect } from 'chai';
import braille from '../src/braille';

describe('braille', function() {

  it('is a function', function() {
    expect(braille).a('function');
  });

  context('valid arguments', function() {

    it('correct for 1 letter', function() {
      const dots = [
        'O.',
        '..',
        '..'
      ];
      expect(braille(dots)).equal('a');
    });

    it('3 letters', function() {
      const dots = [
        'O. OO .O',
        '.. .O OO',
        '.. O. O.'
      ];
      expect(braille(dots)).equal('ant');
    });

  });

  context('invalid arguments', function() {

    it('no letters', function() {
      const dots = [
        '',
        '',
        ''
      ];
      expect(braille(dots)).undefined;
    });

    it('nonexistent letters', function() {
      const dots = [
        '.. OO .O',
        '.. .O OO',
        '.. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('unequally long rows', function() {
      const dots = [
        'O. OO .O',
        '.. .O',
        '.. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('equally but invalidly long rows', function() {
      const dots = [
        'O. OO .',
        '.. .O 0',
        '.. O. O'
      ];
      expect(braille(dots)).undefined;
    });

    it('missing spaces', function() {
      const dots = [
        'O.OO',
        '...O',
        '..O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('excess spaces', function() {
      const dots = [
        'O.  OO  .O',
        '..  .O  OO',
        '..  O.  O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('leading spaces', function() {
      const dots = [
        ' O. OO .O',
        ' .. .O OO',
        ' .. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('trailing spaces', function() {
      const dots = [
        'O. OO .O ',
        '.. .O OO ',
        '.. O. O. '
      ];
      expect(braille(dots)).undefined;
    });

    it('invalid dot symbols', function() {
      const dots = [
        '.. OO .O',
        '.. .0 OO',
        '.. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('too few elements', function() {
      const dots = [
        'O. OO .O',
        '.. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('too many elements', function() {
      const dots = [
        'O. OO .O',
        '.. .O OO',
        '.. O. O.',
        'O. OO .O',
        '.. .O OO',
        '.. O. O.'
      ];
      expect(braille(dots)).undefined;
    });

    it('string argument', function() {
      const dots = 'O. OO .O\n.. .O OO\n.. O. O.';
      expect(braille(dots)).undefined;
    });

    it('object argument', function() {
      const dots = {
        top: 'O. OO .O',
        mid: '.. .O OO',
        low: '.. O. O.'
      };
      expect(braille(dots)).undefined;
    });

    it('missing argument', function() {
      expect(braille()).undefined;
    });

    it('excess arguments', function() {
      const dots = [
        'O. OO .O',
        '.. .O OO',
        '.. O. O.'
      ];
      expect(braille(dots, true)).undefined;
    });

  });

});
