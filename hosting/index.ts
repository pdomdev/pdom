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
const reponse = await sendMessage(window.parent, { type: 'pdom-init' }, hostOrigin);
const { nodeType, attrs, scriptUrl } = reponse;
createElement(nodeType, attrs);
const fqnScriptUrl = (scriptUrl.startsWith('http'))
    ? scriptUrl
    : new URL(scriptUrl, hostOrigin).href;

await import(
    /* @vite-ignore */
    fqnScriptUrl
);

sendMessage(window.parent, { type: 'pdom-loaded' }, hostOrigin);
