let text = document.getElementsByClassName("text");
let i = 0;
let correct;

// Record every key press
this.addEventListener("keydown", (event) => {
    if (i < text.length) {
        // Check if key press matches character
        if (event.key === text[i].innerText) {
            // Don't skip wrong input. The user HAS to press the correct key
            // or else he can't move on to the next. The red color must stay
            // if the user gave wrong input BEFORE his fix.
            if (correct === true) {
                text[i].style.color = "#808080";
            }
            correct = true;
            ++i;
        } else {
            // TODO: Wait for the user to type the correct key and THEN make
            // the letter red, NOT before.
            text[i].style.color = "#ff0000";
            correct = false;
        }
    }
});
