import * as THREE from 'three'
import Fractal from "./Fractal";

const MATERIAL =  new THREE.MeshPhongMaterial({ color: 0x61dfe2, flatShading: true, shininess: 2 });

function draw_tetrahedron(x, y, z, b, h){
    //represents a single fractal iterations
    const geometry = new THREE.ConeBufferGeometry(b, h, 4, 1);
    const mesh = new THREE.Mesh(geometry, MATERIAL)

    mesh.position.set(x, y, z);
    return mesh;     // to be added to the canvas
};

export class Sierpinsky extends Fractal
{
    constructor(sceneWrapper, precision) {
        super(sceneWrapper)
        this.precision = precision                  // gives the depth of the fractal, shall be tweaked from a slider
        this.geometry = new THREE.Group()           // a group of tetrahedrons making up the fractal
    }

    redraw() {
        console.log("redraw method called!!")
        this.sceneWrapper.scene.remove(this.geometry)
        this.geometry = new THREE.Group()
        this.generate_fractal(0, 2, 0, 10, 10, this.precision, 0)
        this.sceneWrapper.scene.add(this.geometry)
    }

    generate_fractal(x, y, z, b, h, precision, iteration) {
        if (iteration === precision) {
            this.geometry.add(draw_tetrahedron(x, y, z, b, h)); // one iteration completed, so we can add a piece to the group
        }
        else {
            // generate new params for the recursive calls
            const new_b = b / 2;
            const new_h = h / 2;

            const childs = [
                [ 0, new_h / 2 , 0 ],
                [ -new_b, -new_h / 2, 0 ],
                [ 0, -new_h / 2, new_b ],
                [ new_b, -new_h / 2, 0 ],
                [ 0, -new_h / 2, -new_b ],
            ];

            childs.forEach((point) => {
                this.generate_fractal(x + point[0], y + point[1], z + point[2], new_b, new_h, precision, iteration + 1);
            });
        }
    }

    init() {
        this.generate_fractal(0, 2, 0, 10, 10, this.precision, 0)
        this.sceneWrapper.scene.add(this.geometry)
        this.sceneWrapper.camera.position.set(0, -2, 20)    // reposition the camera
    }
}

export default Sierpinsky;