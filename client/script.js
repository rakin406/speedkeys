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
    );  // get a huge >4MB list of words from URL
    let text = await response.text();
    return text;
}
fetchWords().then((res) => console.log(res));

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
