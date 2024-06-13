import PDom from 'parallel-dom';

const pdom = new PDom(
    '#parallel',
    new URL('/path/to/pivot20/index.js', import.meta.url).href
);
