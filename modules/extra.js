import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// the scene is passed in main.js where setupFloor is called
export const setupExtra = (scene, camera, renderer, paintingNumber) => {
    let position = 0
  let mixer = null;
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    `/public/models/Model${paintingNumber}.glb`,
    (gltf) => {
      console.log("success");
      console.log("This is gltf: ", gltf);

      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach(function (clip) {
        mixer.clipAction(clip).play();
      });
      const model = gltf.scene;
    //   model.position.set(0, -1, 10)
    // model.position.z = -15;
    // model.position.y = -2;
      model.name = 'catModel';
      console.log('model: ', model)
      gltf.scene.scale.set(5.25, 5.25, 5.25); 
      camera.position.set(0, 0, 20);
      scene.add(model)
      
    },
    () => {
      console.log("progress");
    },
    () => {
      console.log("error");
    });
const clock = new THREE.Clock();
let previousTime = 0;
camera.position.set(0, 0, 20);
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    //update mixer
    if (mixer !== null) {
        mixer.update(deltaTime);
    }
    //renderer
    renderer.render(scene, camera);
    
    // update controls
    // controls.update();
    
    renderer.setAnimationLoop(animate);
};
animate();
};
