import PDom from 'parallel-dom';

const pdom = new PDom(
    '#parallel',
    new URL('pivot.js', import.meta.url).href,
    {
        iframe: false,
        isDomainShardingDisabled: isSelfHosted,
        hostingDomain: (isSelfHosted) ? `${window.location.host}/pdom` : 'pdom.thoughtspot{env}.cloud'
    }
);
