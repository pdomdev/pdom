import {} from 'foo';

const el = document.querySelector('#parallel');

if (!el) {
    throw new Error('Element not found');
}

let i = 0;
setInterval(() => {
    el.innerHTML = i++ + '';
}, 10);