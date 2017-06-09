// Identify the notes.
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
// Identify the duration of a period.
const period = 1000;
// Create an audio context.
const player = new AudioContext();
// Create a fixed-note generator.
const noteMaker = player.createOscillator();
// Create a volume control.
const volume = player.createGain();
// Connect the note generator to it.
noteMaker.connect(volume);
// Connect the volume control to the speaker.
volume.connect(player.destination);
// Set the volume.
volume.gain.value = 0.01;
// Start the output.
noteMaker.start();
/*
  Define a function that sets the frequency and, after the period, executes
  itself for the next frequency, if there is one.
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
// Execute it, starting with the first note.
playAll(0);
/*
  Define a function that plays chords.
*/
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
// Execute it, starting with the first note.
playAll(0);
