import '../common/loader';
import '../common/fps';
import PDom from '../../library/index';

const pdom = new PDom(
    '#container',
    () => import('../common/busy'),
);
pdom.render();
