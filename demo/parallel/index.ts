import '../common/loader';
import { FPSMeter } from '../common/fps';
import PDom from '../../library/index';

const fps = new FPSMeter({
    container: document.querySelector('#fps'),
});
fps.start();

const pdom = new PDom(
    '#container',
    {
        script: () => import('../common/busy'),
    }
);
pdom.render();
