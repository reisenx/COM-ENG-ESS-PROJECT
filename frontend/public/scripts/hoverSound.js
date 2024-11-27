
const hoverElement = document.getElementById('hoverElement1');
const hoverSound = document.getElementById('hoverSound1');

hoverElement.addEventListener('mouseover', function() {
    hoverSound.play();
});

hoverElement.addEventListener('mouseout', function() {
    hoverSound.pause();
    hoverSound.currentTime = 0; 
});

const hoverElement2 = document.getElementById('hoverElement2');
const hoverSound2 = document.getElementById('hoverSound2');

hoverElement2.addEventListener('mouseover', function() {
    hoverSound2.play();
});

hoverElement2.addEventListener('mouseout', function() {
    hoverSound2.pause();
    hoverSound2.currentTime = 0; 
});


const hoverElement3 = document.getElementById('hoverElement3');
const hoverSound3 = document.getElementById('hoverSound3');

hoverElement3.addEventListener('mouseover', function() {
    hoverSound3.play();
});

hoverElement3.addEventListener('mouseout', function() {
    hoverSound3.pause();
    hoverSound3.currentTime = 0; 
});
