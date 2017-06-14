import { expect } from 'chai';
import iso8601ify from '../src/iso8601ify';
import { iso8601ifyFile } from '../src/iso8601ify';

describe('iso8601ify', function() {

  it('is a function', function() {
    expect(iso8601ify).a('function');
  });

  context('valid arguments', function() {

    it('correct for yyyy-mm-dd format', function() {
      const string = '1950-01-01';
      expect(iso8601ify(string)).equal('1950-01-01');
    });

    it('correct for 20th century mm/dd/yy format', function() {
      const string = '01/01/50';
      expect(iso8601ify(string)).equal('1950-01-01');
    });

    it('correct for 21st century mm/dd/yy format', function() {
      const string = '12/31/49';
      expect(iso8601ify(string)).equal('2049-12-31');
    });

    it('correct for mm#yy#dd format', function() {
      const string = '01#00#01';
      expect(iso8601ify(string)).equal('2000-01-01');
    });

    it('correct for dd*mm*yyyy format', function() {
      const string = '01*01*2000';
      expect(iso8601ify(string)).equal('2000-01-01');
    });

    it('correct for (month in words) dd, yy format', function() {
      const string = 'Jan 01, 50';
      expect(iso8601ify(string)).equal('1950-01-01');
    });

    it('correct for (month in words) dd, yyyy format', function() {
      const string = 'Dec 31, 2031';
      expect(iso8601ify(string)).equal('2031-12-31');
    });

    it('correct for nonexistent date in yyyy-mm-dd format', function() {
      const string = '2955-21-05';
      expect(iso8601ify(string)).equal('2955-21-05');
    });

    it('correct for nonexistent date in dd*mm*yyyy format', function() {
      const string = '35*06*1966';
      expect(iso8601ify(string)).equal('1966-06-35');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument 0', function() {
      expect(iso8601ify(19990520)).undefined;
    });

    it('correct for array as argument 0', function() {
      expect(iso8601ify([1999, 5, 20])).undefined;
    });

    it('correct for excess arguments', function() {
      expect(iso8601ify('1950-01-01', true)).undefined;
    });

    it('correct for no arguments', function() {
      expect(iso8601ify()).undefined;
    });

    it('correct for argument 0 with unpadded 1-digit months', function() {
      expect(iso8601ify(['2015-7-30'])).undefined;
    });

    it('correct for argument 0 with 3-digit days', function() {
      expect(iso8601ify(['1955-11-024'])).undefined;
    });

    it('correct for argument 0 with unpadded 1-digit days', function() {
      expect(iso8601ify(['3*07*2015'])).undefined;
    });

    it('correct for argument 0 with deviant delimiters', function() {
      expect(iso8601ify(['15/05/1955'])).undefined;
    });

    it('correct for argument 0 with non-Arabic numbers', function() {
      expect(iso8601ify(['1955-ix-24'])).undefined;
    });

  });

  context('file of 1000 dates', function() {

    const conversions = iso8601ifyFile('./data/iso8601ify/dates.txt');

    it('batch conversion produces a string', function() {
      expect(typeof conversions).equal('string');
    });

    it('conversion of 1000 dates is 11,000 characters long', function() {
      expect(conversions.length).equal(11000);
    });

    it('first of 1000 conversions is correct', function() {
      expect(conversions.slice(0, 10)).equal('1965-09-21');
    });

  });

});
