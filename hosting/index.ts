import { onMessage, sendMessage } from 'promise-postmessage';
import { inject } from "@vercel/analytics"
inject();

function createElement(nodeType, attrs) {
    const el = document.createElement(nodeType);
    Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value)
    });
    document.body.insertAdjacentElement('afterbegin', el);
}

const params = new URLSearchParams(window.location.search);
const host = params.get('host') as string;
const scheme = params.get('scheme');
const hostOrigin = `${scheme}://${host}`;

console.log('hostOrigin', hostOrigin);
const event = await sendMessage(window.parent, { type: 'pdom-ready' }, hostOrigin);
const { nodeType, attrs, scriptUrl } = event.data;
createElement(nodeType, attrs);
const fqnScriptUrl = new URL(scriptUrl, hostOrigin).href;

import(
    /* @vite-ignore */
    fqnScriptUrl
);

