import { expect } from 'chai';
import symlinks from '../src/symlinks';

describe('symlinks', function() {

  it('is a function', function() {
    expect(symlinks).to.be.a('function');
  });

  context('valid arguments', function() {

    it('correct for no links', function() {
      const string = '0\n/abc/def.ghi';
      expect(symlinks(string)).to.equal('/abc/def.ghi');
    });

    it('correct for 1 link', function() {
      const string = '1\n/bin:/usr/bin\n/bin/bash';
      expect(symlinks(string)).to.equal('/usr/bin/bash');
    });

    it('correct for 2 links', function() {
      const string = '2\n/abc:/def\n/def/ghi:/jkl\n/abc/ghi/zzz';
      expect(symlinks(string)).to.equal('/jkl/zzz');
    });

    it('correct for nonmatching links', function() {
      const string = '2\n/abc:/def\n/def/ghi:/jkl\n/abd/ghi/zzz';
      expect(symlinks(string)).to.equal('/abd/ghi/zzz');
    });

  });

  context('invalid arguments', function() {

    it('correct for links out of order', function() {
      const string = '2\n/def/ghi:/jkl\n/abc:/def\n/abc/ghi/zzz';
      expect(symlinks(string)).to.be.undefined;
    });

    it('correct for cyclic links', function() {
      const string = '2\n/bin:/usr/bin\n/usr/bin:/bin\nbin/bash';
      expect(symlinks(string)).to.be.undefined;
    });

    it('correct for wrong link count', function() {
      const string = '2\n/bin:/usr/bin\n/bin/bash';
      expect(symlinks(string)).to.be.undefined;
    });

    it('correct for missing link count', function() {
      const string = '/bin:/usr/bin\n/bin/bash';
      expect(symlinks(string)).to.be.undefined;
    });

    it('correct for misformatted argument', function() {
      const string = '1\n/bin:/usr/bin:/user/sbin\n/bin/bash';
      expect(symlinks(string)).to.be.undefined;
    });

    it('correct for number as argument', function() {
      expect(symlinks(456)).to.be.undefined;
    });

    it('correct for array as argument', function() {
      expect(symlinks(['1\n/bin:/usr/bin\n/bin/bash'])).to.be.undefined;
    });

    it('correct for object as argument', function() {
      expect(symlinks({1: '\n/bin:/usr/bin\n/bin/bash'})).to.be.undefined;
    });

    it('correct for excess arguments', function() {
      expect(symlinks('0\n/abc/def.ghi', 'superfluous')).to.be.undefined;
    });

    it('correct for no arguments', function() {
      expect(symlinks()).to.be.undefined;
    });

  });

});
