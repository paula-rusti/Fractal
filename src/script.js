import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import SceneWrapper from './SceneWrapper'

const scene = new SceneWrapper();

console.log(scene)

scene.init();
scene.start();