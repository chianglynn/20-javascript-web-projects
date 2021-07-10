const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'YOUR_API_KEY',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    // Twopart Joke
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
    // Single Joke
    // const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Twopart Joke
        if (data.setup) joke = `${data.setup} ... ${data.delivery}`;
        // Single Joke
        else joke = data.joke;
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.error('fetch failed', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);