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
        let theCh = chn
//pass in an array of events
        //Song.Song[Song.Song.length] = undefined //insert end of song mark
        let nn = 0
        parts.push( new Tone.Part(function (time, event) {
            if (theCh == 0 && nn == 0) {
                recorder.start()
            }
            if (event != undefined) {
                //the events will be given to the callback with the time they occur
                synth.triggerAttackRelease(event.note, event.duration, time)
            }
            if (theCh == 0) {
                nn++
            }
            if (theCh == 0 && nn >= channel.length) {

                setTimeout(() => recorder.stop(), 1000)
            }
        }, channel))
        chn++
    }

//start the part at the beginning of the Transport's timeline
    Tone.Transport.bpm.value = 180
    parts.forEach(it => {it.start()})
    Tone.Transport.start()
})

//document.querySelector('audio').onplay =  addEventListener("click", play)

