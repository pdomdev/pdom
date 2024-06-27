// import PDom from '../library/index';

// const pdom = new PDom(
//     '#parallel',
//     {
//         script: () => import('./worker'),
//     }
// );
import '../common/busy';
import '../common/loader';
import { FPSMeter } from '../common/fps';


const fps = new FPSMeter({
    container: document.querySelector('#fps'),
});
fps.start();

