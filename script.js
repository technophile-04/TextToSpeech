// INit speechSynth API
const synth = window.speechSynthesis;

//grabbing  DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch  = document.querySelector('#pitch');
const pitchValue  = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// init voice array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //Loop voices and create option for each one
    let options = ''
    voices.forEach(voice => {
        options += `<option data-lang = "${voice.lang}" data-name = "${voice.name}">${voice.name} (${voice.lang})</option>`
    });
    voiceSelect.innerHTML = options;
}

getVoices();
if(synth.onvoiceschanged !== undefined)
{
    synth.onvoiceschanged = getVoices;
}


// Speak

const speak = () => {
    // check if speaking
    if(synth.speaking){
        console.error('Already speaking..')
        return;
    }

    if(textInput.value !== ''){
        // Add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        // speak end 
        speakText.onend = e => {
            console.log('Done speaking..');
            body.style.background = '#141414'
        }

        // speak error
        speakText.onerror = e => {
            console.error('Something went wrong');
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice)
            {
                speakText.voice = voice;
            }
        });

        // set pitch and rate 
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // speak
        synth.speak(speakText);
    }

};


// Event listners 


// Text form submit
textForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate vlaue change 
rate.addEventListener('change', e => rateValue.textContent = rate.value);
// Pitch value change 
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select change 
voiceSelect.addEventListener('change', e => speak());