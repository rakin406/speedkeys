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

let text = document.getElementsByClassName("text");
let i = 0;
let correct = true;

async function fetchWords() {
    let response = await fetch(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
    ); // get a huge >4MB word list from URL
    let text = await response.text();
    let words = text.split("\n");
    let randomText = "";

    // Loop a number of times and create a randomly generated sentence out of it
    // NOTE: Max words is 25, so that the text won't look too big or too small
    const MAX_WORDS = 20;
    for (let i = 0; i <= MAX_WORDS; ++i) {
        // Get a random word from list and add it to the sentence
        let randomWord = words[Math.floor(Math.random() * words.length)];
        randomText = randomText.concat(randomWord, " ");
    }

    randomText = randomText.trim();
    console.log(randomText); // debugging
}
fetchWords();

this.addEventListener("keydown", (event) => {
    // Ensure that key press is NOT an excluded special character and also
    // ensure that text length is always higher than the index.
    if (!IGNORED_CHARS.includes(event.key) && i < text.length) {
        // Check if key press matches the character from text
        if (event.key === text[i].innerText) {
            // Detect correct and wrong input
            if (correct == true) {
                text[i].style.color = "#008000"; // green if correct
            } else {
                text[i].style.color = "#ff0000"; // red if wrong
            }
            correct = true;
            ++i; // move on to the next character in the text
        } else {
            correct = false;
        }
    }
});
