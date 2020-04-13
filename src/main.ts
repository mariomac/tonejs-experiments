import * as Tone from 'tone';

console.log("perrukiiss")

// fixes issue https://github.com/microsoft/TypeScript/issues/31686
interface Window {
    webkitAudioContext: typeof AudioContext
}

var synth: Tone.FMSynth
document.getElementById("play").onclick = function () {
    synth = new Tone.FMSynth().toDestination()

//schedule a series of notes, one per second
    synth.triggerAttackRelease('C4', 0.5, 0)
    synth.triggerAttackRelease('E4', 0.5, 1)
    synth.triggerAttackRelease('G4', 0.5, 2)
    synth.triggerAttackRelease('B4', 0.5, 3)
}

document.getElementById("stop").onclick = function () {
    synth.dispose();
}