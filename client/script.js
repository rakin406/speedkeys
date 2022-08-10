let textbox = document.getElementById("textbox");
let tbString = textbox.value.trim();
let i = 0;

// Record every key press
textbox.addEventListener("keydown", (event) => {
    // Check if key press matches textarea character
    if (event.key === tbString[i]) {
        console.log(event.key); // debugging
        ++i;
    }
})
