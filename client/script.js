let text = document.getElementsByClassName("text"); // characters
let i = 0; // character index
let correct = true; // boolean for detecting correct and wrong input

this.addEventListener("keydown", (event) => {
    if (i < text.length) {
        if (event.key === text[i].innerText) {
            if (correct == true) {
                text[i].style.color = "#808080"; // grey if correct
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
