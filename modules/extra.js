import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// const scene = new THREE.Scene();


// the scene is passed in main.js where setupFloor is called
export const setupExtra = (scene, camera, renderer, paintingNumber) => {

  // var scene = new THREE.Scene();
  // var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);
  // var renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)

  // var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2)
  // scene.add(light);

  // const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
  // scene.add(directionalLight)
  
  // const pointLight = new THREE.PointLight(0xffffff, 0.3)
  // scene.add(pointLight)

  // const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectAreaLight);


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
    // if(paintingNumber === "10") {
    //   // model.position.z = 15;
    //   model.position.y = -2;
    //   console.log('model position', model.position);
    // }
      model.name = 'catModel';
      console.log('model: ', model)
      gltf.scene.scale.set(5.25, 5.25, 5.25); 
      // gltf.scene.scale.set(0.025, 0.025, 0.025); 
      // camera.position.set(0, 0, 20);
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
// camera.position.set(0, 0, 20);
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
    
    // controls.update();

    // console.log('This is update controls: ', controls.update());
    
    renderer.setAnimationLoop(animate);
};
animate();
};
