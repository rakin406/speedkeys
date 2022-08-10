let text = document.getElementsByClassName("text");
let i = 0;

// Record every key press
this.addEventListener("keydown", (event) => {
    if (i < text.length) {
        // Check if key press matches character
        if (event.key === text[i].innerText) {
            console.log(event.key); // debugging
            ++i;
        }
    }
});
