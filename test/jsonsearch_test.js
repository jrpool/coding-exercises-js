import { expect } from 'chai';
import jsonSearch from '../src/jsonsearch';

describe('jsonSearch', function() {

  it('is a function', function() {
    expect(jsonSearch).a('function');
  });

  const usa = '{\
    "capital": "Washington",\
    "states": [\
      {\
        "name": "California",\
        "capital": "Sacramento",\
        "biggestCity": "Los Angeles",\
        "nth": 31\
      },\
      {\
        "name": "New York",\
        "capital": "Albany",\
        "biggestCity": "New York",\
        "nth": 11\
      }\
    ],\
    "hemisphere": "Western"\
  }';

  context('valid arguments', function() {

    it('correct for top-level value', function() {
      expect(jsonSearch(usa, 'Western')).equal('hemisphere');
    });

    it('correct for second-level value', function() {
      expect(jsonSearch(usa, 11)).equal('states -> 1 -> nth');
    });

    it('correct for value not in the object', function() {
      expect(jsonSearch(usa, 'Lincoln')).equal('');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument 0', function() {
      expect(jsonSearch(456, 456)).undefined;
    });

    it('correct for array as argument 0', function() {
      expect(jsonSearch([usa], 'value')).undefined;
    });

    it('correct for object as argument 0', function() {
      expect(jsonSearch({usa: true}, 'value')).undefined;
    });

    it('correct for array as argument 1', function() {
      expect(jsonSearch(usa, ['New York'])).undefined;
    });

    it('correct for object as argument 1', function() {
      expect(jsonSearch(usa, {'capital': 'New York'})).undefined;
    });

    it('correct for missing argument 1', function() {
      expect(jsonSearch(usa)).undefined;
    });

    it('correct for excess arguments', function() {
      expect(jsonSearch(usa, 11, true)).undefined;
    });

    it('correct for no arguments', function() {
      expect(jsonSearch()).undefined;
    });

  });

});
