import * as Tone from 'tone';
import * as Song from './song'

let started = false
document.documentElement.addEventListener('mousedown',  () => {
    if (started) return;
    console.log("starting stuff")
    started = true;

    let audio = document.querySelector('audio');

    let dest = Tone.context.createMediaStreamDestination();

    // @ts-ignore
    const recorder = new MediaRecorder(dest.stream);

    var synth = new Tone.PolySynth()
        .connect(dest)
        .toDestination()

    // @ts-ignore
    const chunks = [];

    // @ts-ignore
    recorder.ondataavailable = evt => chunks.push(evt.data);
    // @ts-ignore
    recorder.onstop = evt => {
        // @ts-ignore
        let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
        audio.src = URL.createObjectURL(blob);
    };

    let parts = new Array<Tone.Part>()
    let chn = 0
    for(let channel of Object.values(Song.Song)) {
//pass in an array of events
        let nn = 0
        parts.push( new Tone.Part(function (time, event) {
            if (chn == 0 && nn == 0) {
                recorder.start()
            }
            //the events will be given to the callback with the time they occur
            synth.triggerAttackRelease(event.note, event.duration, time)
            nn++
            if (chn == 0 && nn >= channel.length) {
                setTimeout(() => recorder.stop(), 1000)
            }
        }, channel))
        chn++
    }

//start the part at the beginning of the Transport's timeline
    parts.forEach(it => {it.start()})

    Tone.Transport.bpm.value = 180

//start the part at the beginning of the Transport's timeline
    Tone.Transport.bpm.value = 180
    Tone.Transport.start()
})

//document.querySelector('audio').onplay =  addEventListener("click", play)

