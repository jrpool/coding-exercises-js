//import { expect } from 'chai';
//import finiteStateGate from '../src/finitestategate';

describe.skip('finiteStateGate', function() {
  const ir = 'remoteClicked';
  const id = 'cycleComplete';
  const sr = 'Remote clicked.';
  const sd = 'Cycle complete';
  const so = 'Gate: OPEN';
  const sc = 'Gate: CLOSED';
  const xo = 'Gate: STOPPED_WHILE_OPENING';
  const xc = 'Gate: STOPPED_WHILE_CLOSING';
  const mo = 'Gate: OPENING';
  const mc = 'Gate: CLOSING';

  it('is a function', function() {
    expect(finiteStateGate).a('function');
  });

  context('valid arguments', function() {

    it('correct for only patient acts', function() {
      const acts = [ir, id, ir, id, ir, id];
      expect(finiteStateGate(acts)).equal([
        sc, sr, mo, sd, so, sr, mc, sd, sc, sr, mo, sd, so
      ]);
    });

    it('correct for even count of only impatient acts', function() {
      const acts = [ir, ir, ir, ir];
      expect(finiteStateGate(acts)).equal([
        sc, sr, mo, sr, xo, sr, mc, sr, xc
      ]);
    });

    it('correct for odd count of only impatient acts', function() {
      const acts = [ir, ir, ir, ir, ir];
      expect(finiteStateGate(acts)).equal([
        sc, sr, mo, sr, xo, sr, mc, sr, xc, sr, mo, sd, so
      ]);
    });

    it('correct for patient and impatient acts', function() {
      const acts = [ir, ir, ir, id, ir, ir];
      expect(finiteStateGate(acts)).equal([
        sc, sr, mo, sr, xo, sr, mc, sd, sc, sr, mo, sr, xo
      ]);
    });

    it('correct for no acts', function() {
      const acts = [];
      expect(finiteStateGate(acts)).equal([sc]);
    });

  });

  context('invalid arguments', function() {

    it('correct for adjacent cycle completions', function() {
      const acts = [ir, ir, id, id, ir];
      expect(finiteStateGate(acts)).undefined;
    });

    it('correct for initial cycle completion', function() {
      const acts = [id, ir, ir, id, ir];
      expect(finiteStateGate(acts)).undefined;
    });

    it('correct for cycle completion during stop', function() {
      const acts = [ir, ir, id, ir];
      expect(finiteStateGate(acts)).undefined;
    });

    it('correct for missing cycle completion', function() {
      const acts = [ir, ir, ir];
      expect(finiteStateGate(acts)).undefined;
    });

    it('correct for number as argument', function() {
      expect(finiteStateGate(456)).undefined;
    });

    it('correct for string as argument', function() {
      expect(finiteStateGate(ir + id)).undefined;
    });

    it('correct for object as argument', function() {
      expect(finiteStateGate({a: ir, b: id})).undefined;
    });

    it('correct for excess arguments', function() {
      const acts = [ir, id, ir, id, ir, id];
      expect(finiteStateGate(acts, true)).undefined;
    });

    it('correct for no arguments', function() {
      expect(finiteStateGate()).undefined;
    });

    it('correct for argument with invalid act', function() {
      const acts = [ir, id, ir, id, 'remote clicked', id];
      expect(finiteStateGate(acts)).undefined;
    });

  });

});
