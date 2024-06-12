import PDom from 'parallel-dom';

const pdom = new PDom(
    '#parallel',
    new URL('worker.js', import.meta.url).href
);
