import * as Tone from 'tone';
import * as Song from './song'
import {TickParam} from "tone/build/esm/core/clock/TickParam";

async function play() {
    await Tone.start()
    Tone.Transport.stop()

    var synth = new Tone.Synth().toDestination()

//pass in an array of events
    var part = new Tone.Part(function (time, event) {
        //the events will be given to the callback with the time they occur
        synth.triggerAttackRelease(event.note, event.duration, time)
    }, Song.Song)

//start the part at the beginning of the Transport's timeline
    part.start(0)

    Tone.Transport.bpm.value = 130
    Tone.Transport.start()
}

document.getElementById("play").addEventListener("click", play)

