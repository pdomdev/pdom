import { onMessage, sendMessage } from 'promise-postmessage';

export interface PDomOptions {
    scriptUrl: string;
    domainUrl?: string;
}

const DOMAIN_SUFFIX = 'pdom.dev';

function generateIframeSrc(url?: string) {
    const randomUUID = crypto.randomUUID().slice(0, 8);
    const params = new URLSearchParams({
        host: window.location.host,
        scheme: window.location.protocol.replace(':', ''),
    });
    const host = url || `${randomUUID}.${DOMAIN_SUFFIX}`;
    return `https://${host}?${params.toString()}`;
}

export default class PDom {
    private iframeEl: HTMLIFrameElement;
    private callbacks: Record<string, Function[]> = {};
    private options: PDomOptions;
    private el: HTMLElement;

    public onLoad: () => void;
    public onError: (err) => void;

    constructor(_el: HTMLElement | string, options: PDomOptions | string) {
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

        if (typeof options === 'string') {
            options = { scriptUrl: options };
        }
        this.options = options;

        const { nodeType, attrs } = this.getNodeTypeAndAttrs(this.el);
        const iframeSrc = generateIframeSrc(options.domainUrl);
        this.iframeEl = this.getIframeEl(iframeSrc);
        this.on('pdom-init', async (data) => {
            const { scriptUrl } = this.options;
            return { nodeType, attrs, scriptUrl };
        });
    }

    public render() {
        this.on('pdom-loaded', () => {
            this.onLoad?.();
        });

        this.on('pdom-error', (err) => {
            this.onError?.(err);
        });

        this.iframeEl.onerror = this.onError as any;

        this.el.replaceChildren(this.iframeEl);
        this.subscribeToIframeMessages();

    }

    private getNodeTypeAndAttrs(el: HTMLElement) {
        let nodeType = el.nodeName.toLowerCase();
        let attrs = {};
        if (el.hasAttributes()) {
            attrs = Array.from(el.attributes).reduce((acc, attr) => {
                acc[attr.name] = attr.value;
                return acc;
            }, {});
        }
        if (el.id) {
            attrs['id'] = el.id;
        }
        if (el.classList.length) {
            attrs['class'] = Array.from(el.classList).join(' ');
        }
        return { nodeType, attrs };
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
        }, this.iframeEl);
    }

    private async executeCallbacks(data) {
        let retVal = null;
        if (data.type && this.callbacks[data.type]) {
            // call each callback and await for and override the return value
            for (let cb of this.callbacks[data.type]) {
                retVal = await cb(data);
            }
        }
        return retVal;
    }

    private on(type: string, cb: Function) {
        if (!this.callbacks[type]) {
            this.callbacks[type] = [];
        }
        this.callbacks[type].push(cb);
    }
}