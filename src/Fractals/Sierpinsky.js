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

function draw_sierpinsky_in_scene(scene, x, y, z, b, h, precision, iteration){
    // contains the fractal generation logic, uses the above function to draw a tetrahedron pieces
    if (iteration === precision) {
        // one iteration completed, so we can add a piece to the scene
        scene.add(draw_tetrahedron(x, y, z, b, h));
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
            draw_sierpinsky_in_scene(scene, x + point[0], y + point[1], z + point[2], new_b, new_h, precision, iteration + 1);
        });
    }
};

export class Sierpinsky extends Fractal
{
    constructor(sceneWrapper) {
        super(sceneWrapper)
    }

    init() {
        // call a function to create the sierpinsky fractal in this scene
        draw_sierpinsky_in_scene(this.sceneWrapper.scene, 0, 2, 0, 10, 10, 5, 0)

        // reposition the camera
        this.sceneWrapper.camera.position.set(0, -2, 20)
    }
}

export default Sierpinsky;