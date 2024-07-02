import '../common/loader';
import '../common/fps';
import PDom from '../../library/index';

const pdom = new PDom(
    '#container',
    {
        script: () => import('../common/busy'),
    }
);
pdom.render();
