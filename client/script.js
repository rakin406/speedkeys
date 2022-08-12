// TODO: Show correct score
//
// Utils
function setScore(score) {
    // Build the expiration date string
    let expirationDate = new Date();
    let scoreString = `score=${score};`;
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    scoreString = scoreString.concat(` expires=${expirationDate.toUTCString()}`);
    // Create or update the score
    document.cookie = scoreString;
}

function getScore() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; score=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Show your highest score
function showScore() {
    let score = 0;
    // Show score "0" if undefined
    if (getScore("score") !== undefined) {
        score = getScore("score");
    }
    alert(`Your highest score is ${score} WPM!`);
}

// Create a randomly generated sentence
function createSentence(words, max) {
    let randomText = "";
    for (let i = 0; i <= max; ++i) {
        // Get a random word from list and add it to the sentence
        let randomWord = words[Math.floor(Math.random() * words.length)];
        randomWord = randomWord.trim();
        randomText = randomText.concat(randomWord, " ");
    }
    return randomText.trim();
}

// Create span tags and put letters in each one of them
function createSpanText(word) {
    let textbox = document.getElementById("textbox");
    for (let letter of word) {
        let textSpan = document.createElement("span");
        textSpan.className = "text"; // needed for CSS styling
        textSpan.innerHTML = letter;
        textbox.appendChild(textSpan);
    }
}

// Scrape words from online
async function fetchWords() {
    // TODO: Increase performance of this fetch somehow. Maybe load the next
    // fetch asynchronously while typing and store the data in an array or something??
    let response = await fetch(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
    ); // get a huge >4MB word list from URL
    let text = await response.text();
    let words = text.split("\n");

    // Max words is this much so that the text won't look too big or too small
    const MAX_WORDS = 15;
    let sentence = createSentence(words, MAX_WORDS); // generate sentence
    createSpanText(sentence); // view sentence on page
}
fetchWords();

// Fetch words again
function reset() {
    // Remove all previous text or span tags
    document.querySelectorAll(".text").forEach((el) => {
        el.remove();
    });
    fetchWords();
    i = 0; // reset index
}

// Colorize letter based on correct/wrong input
function colorizeLetter(letter) {
    // Detect correct and wrong input
    if (correct == true) {
        letter.style.color = "#008000"; // green if correct
    } else {
        letter.style.color = "#ff0000"; // red if wrong
    }
}

let charCount = errors = 0;
function getAccuracy(typedEntries, errors = 0) {
    return Math.trunc((typedEntries / 5) - errors);
}

// Start counting time
function startTimer(duration, display) {
    let timer = duration,
        minutes,
        seconds;
    let updateInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        // Stop timer when it reaches 0
        if (--timer < 0) {
            clearInterval(updateInterval);
            document.onkeydown = null;  // stop recording keys

            // View WPM
            let wpmDisplay = document.querySelector("#wpm");
            let accuracy = getAccuracy(charCount, errors);
            wpmDisplay.textContent = `${accuracy} WPM`;

            // Store accuracy
            if (accuracy > getScore("score")) {
                setScore(accuracy);
            }
        }
    }, 1000);
}

const IGNORED_CHARS = [
    "Control",
    "Meta",
    "Alt",
    "ContextMenu",
    "ArrowLeft",
    "ArrowRight",
    "ArrowDown",
    "ArrowUp",
    "Shift",
    "CapsLock",
    "Backspace",
    "Insert",
    "Delete",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Escape",
];

let started = false;
let text = document.getElementsByClassName("text");
let i = 0;
let correct = true;

document.onkeydown = (event) => {
    let lastIndex = text.length - 1;
    if (i == lastIndex) {
        reset();
    }

    // Ensure that key press is NOT an excluded special character and also
    // ensure that text length is always higher than the index.
    if (!IGNORED_CHARS.includes(event.key) && i < text.length) {
        // Start timer on key press
        if (started == false) {
            let timerDisplay = document.querySelector("#timer");
            startTimer(59, timerDisplay); // start counting from one minute
            started = true;
        }

        // Check if key press matches the character from text
        if (event.key === text[i].innerText) {
            colorizeLetter(text[i]);
            correct = true;
            ++charCount;
            ++i; // move on to the next character in the text
        } else {
            // Error only once, not multiple times
            if (correct == true) {
                correct = false;
                ++errors;
            }
        }
    }
}
