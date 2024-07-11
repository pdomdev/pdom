import '../common/loader';
import '../common/fps';
import PDom from '../../library/index';

const pdom = new PDom(
    '#container',
    () => import('../common/busy'),
);
pdom.render();

if (!(window as any).originAgentCluster) {
    const warning = document.getElementById('warning');
    warning.style.display = 'block';
}