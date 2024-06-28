import { onMessage, sendMessage } from 'promise-postmessage';
import { getScriptUrlFromFunction } from './util';

export interface PDomOptions {
    script: () => Promise<any>;
    domainUrl?: string;
    noIframe?: boolean;
}

const DOMAIN_SUFFIX = 'pdom.dev';

function generateIframeSrc(origin?: string) {
    const randomUUID = crypto.randomUUID().slice(0, 8);
    const params = new URLSearchParams({
        host: window.location.host,
        scheme: window.location.protocol.replace(':', ''),
    });
    origin = origin || `https://${randomUUID}.${DOMAIN_SUFFIX}`;
    return `${origin}?${params.toString()}`;
}

export default class PDom {
    #iframeEl: HTMLIFrameElement;
    private callbacks: Record<string, Function[]> = {};
    private options: PDomOptions & { scriptUrl?: string };
    private el: HTMLElement;
    #iframeSrc: string;

    public get iframeSrc() {
        return this.#iframeSrc;
    }

    public get containerEl() {
        return this.#iframeEl || this.el;
    }

    constructor(_el: HTMLElement | string, options: PDomOptions | (() => Promise<any>)) {
        console.log('PDom constructor');
        if (!_el) {
            throw new Error('Element is required');
        }

        if (typeof _el === 'string') {
            this.el = document.querySelector(_el) as HTMLElement;
            if (!this.el) {
                throw new Error('Element not found');
            }
        } else {
            this.el = _el;
        }

        if (typeof options === 'function') {
            options = { script: options };
        }
        this.options = options;
        this.options.scriptUrl = getScriptUrlFromFunction(this.options.script);

        if (this.options.noIframe) {
            return;
        }

        const { nodeOuterHTML, cssText } = getOuterHTMLAndStyleString(this.el);
        this.#iframeSrc = generateIframeSrc(options.domainUrl);
        this.#iframeEl = this.getIframeEl(this.#iframeSrc);
        this.on('pdom-init', async (data) => {
            const { scriptUrl } = this.options;
            return { nodeOuterHTML, cssText, scriptUrl };
        });
    }

    /**
     * Method to render the iframe and load the script.
     * @returns Promise<void> which resolves when the iframe is loaded and rejects in case of an error.
     */
    public render() {
        if (this.options.noIframe) {
            return this.renderNoIframe();
        }
        return new Promise<void>((resolve, reject) => {
            this.on('pdom-loaded', () => {
                resolve();
            });

            this.on('pdom-error', (err) => {
                reject(err);
            });

            this.#iframeEl.onerror = reject;

            this.el.replaceChildren(this.#iframeEl);
            this.subscribeToIframeMessages();
        });
    }

    private renderNoIframe() {
        return new Promise<void>((resolve, reject) => {
            const { scriptUrl } = this.options;
            import(
                /* @vite-ignore */
                scriptUrl
            ).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private getIframeEl(iframeSrc: string) {
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        return iframe;
    }

    private subscribeToIframeMessages() {
        onMessage((data) => {
            return this.executeCallbacks(data);
        }, this.#iframeEl);
    }

    private async executeCallbacks(data) {
        if (data._type && this.callbacks[data._type]) {
            // call each callback return the first resolved promise.
            return Promise.race(this.callbacks[data._type].map(async cb => await cb(data)));
        }
    }

    private on(type: string, cb: Function) {
        if (!this.callbacks[type]) {
            this.callbacks[type] = [];
        }
        this.callbacks[type].push(cb);
    }
}

function getOuterHTMLAndStyleString(el: HTMLElement) {
    const nodeOuterHTML = el.outerHTML;
    const styles = getComputedStyle(el);
    let cssText = '';
    for (let i = 0; i < styles.length; i++) {
        const prop = styles[i];
        cssText += `${prop}: ${styles.getPropertyValue(prop)};`;
    }
    return { nodeOuterHTML, cssText };
}