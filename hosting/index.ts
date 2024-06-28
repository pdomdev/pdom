import { onMessage, sendMessage } from 'promise-postmessage';
import { inject } from "@vercel/analytics"
inject();

function createElement(nodeOuterHTML, cssText) {
    document.body.insertAdjacentHTML('afterbegin', nodeOuterHTML);
    const targetEl = document.body.firstElementChild as HTMLElement;
    targetEl.style.cssText = cssText;
}


window.addEventListener('error', (e) => {
    sendMessage(window.parent, {
        _type: 'pdom-error',
        error: {
            message: e.message,
            type: e.type,
        }
    });
});

const params = new URLSearchParams(window.location.search);
const host = params.get('host') as string;
const scheme = params.get('scheme');
const hostOrigin = `${scheme}://${host}`;

console.log('hostOrigin', hostOrigin);
const reponse = await sendMessage(window.parent, { _type: 'pdom-init' }, {
    origin: hostOrigin,
    needsResponse: true,
});
const { nodeOuterHTML, cssText, scriptUrl } = reponse;
createElement(nodeOuterHTML, cssText);
const fqnScriptUrl = (scriptUrl.startsWith('http'))
    ? scriptUrl
    : new URL(scriptUrl, hostOrigin).href;

await import(
    /* @vite-ignore */
    fqnScriptUrl
);

sendMessage(window.parent, { _type: 'pdom-loaded' }, {
    origin: hostOrigin,
});
