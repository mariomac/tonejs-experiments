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

    var synth = new Tone.Synth()
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


    //Song.Song[Song.Song.length] = undefined //insert end of song mark

    let note = 0
//pass in an array of events
    var part = new Tone.Part(function (time, event) {
        if (note == 0) {
            recorder.start()
        }
        if (event != undefined) {
            //the events will be given to the callback with the time they occur
            synth.triggerAttackRelease(event.note, event.duration, time)
        }
        note++
        if (note >= Song.Song.length){
            setTimeout(() => recorder.stop(), 1000)
        }
    }, Song.Song)


//start the part at the beginning of the Transport's timeline
    Tone.Transport.bpm.value = 130
    part.start(0)
    Tone.Transport.start()
})

//document.querySelector('audio').onplay =  addEventListener("click", play)

