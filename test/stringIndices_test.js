import { expect } from 'chai';
import stringIndices from '../src/stringindices';

describe('stringIndices', function() {

  it('is a function', function() {
    expect(stringIndices).a('function');
  });

  context('valid arguments', function() {

    it('correct for first word', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, 1)).equal('This');
    });

    it('correct for last word', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, 5)).equal('words');
    });

    it('correct for index after last word', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, 8)).equal('');
    });

    it('correct for index 0', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, -4)).equal('');
    });

    it('correct for index before first word', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, -4)).equal('');
    });

    it('correct for intermediate word', function() {
      const string = 'This is a few words';
      expect(stringIndices(string, 3)).equal('a');
    });

    it('correct for blank string', function() {
      const string = '';
      expect(stringIndices(string, 1)).equal('');
    });

    it('correct for non-Latin script', function() {
      const string = '그때부터 움집을 지어 가족끼리 살았다';
      expect(stringIndices(string, 2)).equal('움집을');
    });

    it('correct for complex punctuation', function() {
      const string = 'английски – grammar, руски – грамматика и т.н. Българските думи за „граматика“ са сло̀вница и бу̀квеница';
      expect(stringIndices(string, 10)).equal('граматика');
    });

  });

  context('invalid arguments', function() {

    it('correct for number as argument 0', function() {
      expect(stringIndices(456, 1)).undefined;
    });

    it('correct for array as argument 0', function() {
      expect(stringIndices(['this is wrong'], 3)).undefined;
    });

    it('correct for string as argument 1', function() {
      expect(stringIndices('this is wrong', '3')).undefined;
    });

    it('correct for string as argument 1', function() {
      expect(stringIndices('this is wrong', '3')).undefined;
    });

    it('correct for array as argument 1', function() {
      expect(stringIndices('this is wrong', [3])).undefined;
    });

    it('correct for noninteger as argument 1', function() {
      expect(stringIndices('this is wrong', 1.5)).undefined;
    });

    it('correct for missing argument 1', function() {
      expect(stringIndices('this is wrong')).undefined;
    });

    it('correct for excess arguments', function() {
      expect(stringIndices('this is wrong', 1, true)).undefined;
    });

    it('correct for no arguments', function() {
      expect(stringIndices()).undefined;
    });

  });

});
