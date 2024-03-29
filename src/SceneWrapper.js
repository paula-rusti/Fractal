import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Sierpinsky } from './Fractals/Sierpinsky'
import fractal from "./Fractals/Fractal";

export class SceneWrapper{
    constructor() {
        // basic stuff ca sa desenam pe ecran
        this.canvas = document.querySelector('canvas.webgl')
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true });
            
        // define constrols, not used yet    
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.gui = new dat.GUI()   // facem slider cu asta
        
        // structura de cct so far
        this.fractal = null           // our geometry
        this.running = false;        // state of the animation (play/pause)  
        this.start = null           // fct doin the rendering 
    }

    init() {
        const self = this;

        // initial camera position
        this.camera.position.set(0, 0, 2)
        this.scene.add(this.camera)

        // Scene basic setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        // this.renderer.shadowMap.enabled = true;  // nu umblam cu asa cv inca
        
        // controls basic setup, nu folosim inca
        // this.controls.target.set(0, 0, 0);
        // this.controls.update();

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // add a Window resize event handler
        window.addEventListener('resize', () =>
        {
            console.log("resize")
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            self.camera.aspect = sizes.width / sizes.height
            self.camera.updateProjectionMatrix()

            // Update renderer
            self.renderer.setSize(sizes.width, sizes.height)
            self.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        // Scene basic lights
        const pointLight = new THREE.PointLight(0xffffff, 0.9)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        this.scene.add(pointLight)


        // TODO add a slider for the precision property
        this.fractal = new Sierpinsky(this, 3)
        this.fractal.init()
        //this.gui.add(this.fractal, "precision", 1, 5, 1).name("Fractal Depth")

        // TODO redraw the fractal when arrow_down pressed
        document.onkeydown = function(e) {
            console.log(e);
            switch (e.code) {
                case 'ArrowDown':
                    if (self.fractal.precision > 0) {
                        self.fractal.precision -= 1
                        self.fractal.redraw()
                    }
                    break
                case 'ArrowUp':
                    if (self.fractal.precision < 4) {
                        self.fractal.precision += 1
                        self.fractal.redraw()
                    }
                    break
            }
        }

        // render
        const clock = new THREE.Clock()

        const tick = () =>
        {

            const elapsedTime = clock.getElapsedTime()

            // Update objects
            //sphere.rotation.y = .5 * elapsedTime

            // Update Orbital Controls
            // controls.update()

            // Render
            self.renderer.render(this.scene, this.camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        this.start = function() { 
            console.log('start called!!!')
            tick() 
        }
    }

}

export default SceneWrapper