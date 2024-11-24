document.addEventListener("mousemove", (e) => {
  const body = document.body;

  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;

  const moveX = x * 5; 
  const moveY = y * 5; 

  body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});