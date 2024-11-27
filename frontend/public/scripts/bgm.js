document.addEventListener("DOMContentLoaded", () => {
    // Create the audio element
    const bgm = document.createElement("audio");
    bgm.setAttribute("id", "bgm");
    bgm.setAttribute("autoplay", "true");
    bgm.setAttribute("loop", "true");
    bgm.setAttribute("preload", "auto");

    // Create the source element
    const source = document.createElement("source");
    source.setAttribute("src", "res/Sound/BGM.mp3");
    source.setAttribute("type", "audio/mpeg");

    // Append the source to the audio element
    bgm.appendChild(source);

    // Append the audio element to the body (or any other container)
    document.body.appendChild(bgm);
});

document.addEventListener("DOMContentLoaded", () => {
    const bgm = document.getElementById("bgm");
  
    // Attempt to play the audio
    bgm.play().catch(error => {
        console.log("Autoplay blocked. Waiting for user interaction.");
    });
  
    // Optional: Resume playback on user interaction if autoplay fails
    document.body.addEventListener("mousemove", () => {
        if (bgm.paused) {
            bgm.play();
        }
    });
  });
  
  
  muteBtn.addEventListener("click", () => {
    bgm.muted = !bgm.muted;
    muteBtn.textContent = bgm.muted ? "Unmute" : "Mute";
  });