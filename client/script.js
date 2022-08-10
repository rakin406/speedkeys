let text = document.getElementsByClassName("text"); // characters
let i = 0; // character index
let correct = true; // boolean for detecting correct and wrong input

const EXCLUDED_CHARS = ["Control", "Meta", "Alt", "ContextMenu", "ArrowLeft",
    "ArrowRight", "ArrowDown", "ArrowUp", "Shift", "CapsLock", "Backspace",
    "Insert", "Delete", "Home", "End", "PageUp", "PageDown", "Escape"];

this.addEventListener("keydown", (event) => {
    // Ensure that key press is NOT an excluded special character and also
    // ensure that text length is always higher than the index.
    if (!EXCLUDED_CHARS.includes(event.key) && i < text.length) {
        // Check if key press matches the character from text
        if (event.key === text[i].innerText) {
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
