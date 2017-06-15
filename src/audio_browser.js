/** @fileOverview Functions that play notes when audio.html is loaded.
  * @author <a href="mailto: pool@stulta.com">Jonathan Pool</a>
  * @version 0
*/

// Definitions of constants required by playAll.

// Notes.
const notes = [
  ['Do4', 261.63],
  ['Re4', 293.66],
  ['Mi4', 329.63],
  ['Fa4', 349.23],
  ['So4', 392],
  ['La4', 440],
  ['Ti4', 493.88],
  ['Do5', 523.25],
];
// Duration of a period.
const period = 1000;
// Audio context.
const player = new AudioContext();
// Fixed-note generator.
const noteMaker = player.createOscillator();
// Volume control.
const volume = player.createGain();
// Connection between note generator and volume control.
noteMaker.connect(volume);
// Connection between volume control and speaker.
volume.connect(player.destination);
// Volume.
volume.gain.value = 0.01;
// Start the fixed-note generator.
noteMaker.start();

/*
  Function that sets the frequency and, after the period, executes itself for
  the next frequency, if there is one, and, if no frequency remains,
  executes itself for a chord.
*/
const playAll = (noteIndex) => {
  noteMaker.frequency.value = notes[noteIndex][1];
  setTimeout(
    () => {
      if (noteIndex < notes.length - 1) {
        playAll(noteIndex + 1);
      }
      else {
        chord();
      }
    },
    period * 0.75
  );
};

// Execution of playAll, starting with first note.
playAll(0);

// Function that plays chords.
const chord = () => {
  // Create 2 more fixed-note generators.
  const noteMaker2 = player.createOscillator();
  const noteMaker4 = player.createOscillator();
  const noteMaker7 = player.createOscillator();
  // Connect them to the volume control.
  noteMaker2.connect(volume);
  noteMaker4.connect(volume);
  noteMaker7.connect(volume);
  volume.gain.value = 0.015;
  noteMaker.frequency.value = notes[0][1];
  noteMaker2.start();
  noteMaker4.start();
  noteMaker2.frequency.value = notes[2][1];
  noteMaker4.frequency.value = notes[4][1];
  setTimeout(
    () => {
      noteMaker.stop();
      noteMaker2.stop();
      noteMaker4.stop();
    },
    period * 2
  );
};
