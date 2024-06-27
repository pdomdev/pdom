
const loader = document.querySelector('#loader') as HTMLElement;
requestAnimationFrame(function rotate() {
    loader.style.transform = `rotateY(${performance.now() / 4}deg) rotateZ(${performance.now() / 4}deg)`;
    requestAnimationFrame(rotate);
});