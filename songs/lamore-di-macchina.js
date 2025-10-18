/*
  @title Italo Trance — “L’Amore di Macchina”
  @style Inspired by Gigi D’Agostino
  @details 4/4 Italo-trance groove, 128 BPM, E minor
*/

let cpm = 128 / 4;

// --- DRUMS ---
let drums = stack(
  // Solid kick and gentle clap
  sound(`
    <bd>*4,
    <- cp:2>*4
  `).bank("RolandTR909").gain(.85).room(.1).shape(.2),
  // Soft offbeat hats
  sound("<- hh>*8").bank("LinnDrum").gain(.25).shape(.25),
  // Shaker groove to keep the rhythm alive
  sound("<sh>*8").bank("RolandTR808").gain(.2)
);

// --- BASSLINE ---
let bass = cat(
  "<e2>*4",
  "<g2>*4",
  "<b1>*4",
  "<a1>*4"
).note()
  .n(3)
  .sound("gm_synth_bass_2")
  .attack(.05)
  .decay(.25)
  .release(.3)
  .lpf(350)
  .lpenv(4)
  .lpa(.3)
  .gain(.65);

// --- MAIN LEAD / MELODY ---
let lead = cat(
  "<e4 g4 b4 g4 e4 g4 b4 g4>*4",
  "<g4 b4 e5 b4 g4 b4 e5 b4>*4",
  "<a4 c5 e5 c5 a4 c5 e5 c5>*4",
  "<b4 d5 f#5 d5 b4 d5 f#5 d5>*4"
).note()
  .n(0)
  .sound("gm_pad_synth_1")
  .attack(.05)
  .decay(.8)
  .release(.5)
  .lpf(4000)
  .delay(".4:.3:.4")
  .room(.6)
  .rsize(1.5)
  .gain(.55);

// --- PAD / BACKGROUND CHORDS ---
let pad = cat(
  "<e3 g3 b3>*4",
  "<g3 b3 d4>*4",
  "<a3 c4 e4>*4",
  "<b3 d4 f#4>*4"
).note()
  .n(0)
  .sound("gm_pad_warm")
  .lpf(2500)
  .room(.7)
  .gain(.35)
  .slow(2);

// --- STRUCTURE SECTIONS ---
let intro = stack(
  pad.slow(2).gain(.3)
);

let build = stack(
  drums,
  pad,
  bass.gain(.6)
);

let main = stack(
  drums,
  bass,
  lead,
  pad
);

let bridge = stack(
  pad,
  lead.gain(.4).delay(".5:.35:.4")
);

let outro = stack(
  pad.mask("<1 0 0 0 0 0 0 0>").gain(.3)
);

// --- ARRANGEMENT ---
arrange(
  [8, intro],
  [8, build],
  [16, main],
  [8, bridge],
  [16, main],
  [8, outro]
).cpm(cpm);
