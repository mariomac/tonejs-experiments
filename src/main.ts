import * as Tone from 'tone';
import * as Song from './song'
import {start} from "tone";

async function play() {
    await Tone.start()
    Tone.Transport.stop()

    var synth = new Tone.PolySynth().toDestination()

    let parts = new Array<Tone.Part>()
    for(let channel of Object.values(Song.Song)) {
//pass in an array of events
        // @ts-ignore
        const {Song: Song1} = Song;
        parts.push( new Tone.Part(function (time, event) {
            //the events will be given to the callback with the time they occur
            synth.triggerAttackRelease(event.note, event.duration, time)
        }, channel))
    }

//start the part at the beginning of the Transport's timeline
    parts.forEach(it => {it.start()})

    Tone.Transport.bpm.value = 180
    Tone.Transport.start()
}

document.getElementById("play").addEventListener("click", play)

