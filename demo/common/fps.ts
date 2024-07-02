import Stats from 'stats.js';

const statsContainer = document.getElementById('stats');

var fpsStats = new Stats();
fpsStats.showPanel(0);
fpsStats.dom.style.cssText = '';
statsContainer.appendChild(fpsStats.dom);

var memStats = new Stats();
memStats.showPanel(2);
memStats.dom.style.cssText = '';
statsContainer.appendChild(memStats.dom);

var msStats = new Stats();
msStats.showPanel(1);
msStats.dom.style.cssText = '';
statsContainer.appendChild(msStats.dom);

requestAnimationFrame(function loop() {
    fpsStats.update();
    memStats.update();
    requestAnimationFrame(loop)
});
