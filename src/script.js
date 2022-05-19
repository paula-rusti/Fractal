import './style.css'

import SceneWrapper from './SceneWrapper'

const scene = new SceneWrapper();


// function setupKeyLogger() {
//     document.onkeydown = function(e) {
//         console.log(e);
//     }
// }
// setupKeyLogger()


scene.init();
scene.start();