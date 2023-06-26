import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
// const scene = new THREE.Scene();

// const gui = new dat.GUI();


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

  // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
  // scene.add(directionalLightHelper)

  // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  // 	hemiLight.position.set( 0, 20, 0 );
  // 	scene.add( hemiLight );

  // var dirLight = new THREE.DirectionalLight( 0xffffff );
  // dirLight.position.set( - 3, 10,  0 );
  // scene.add( dirLight );


  // const pointLight = new THREE.PointLight(0xffffff, 0.3)
  // scene.add(pointLight)

  // const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectAreaLight);

  const spotLight1 = new THREE.SpotLight(0xffffff, 2, 10, 0.47, 1, 0.11)
  spotLight1.position.set(0, 5.9, 8.1)
  spotLight1.name = "spotLight1"
  scene.add(spotLight1);

  const spotLight2 = new THREE.SpotLight(0xffffff, 2, 10, 0.47, 1, 0.11)
  spotLight2.position.set(9, 5.9, -1.4)
  spotLight2.name = "spotLight2"
  scene.add(spotLight2);

  const spotLight3 = new THREE.SpotLight(0xffffff, 2, 10, 0.47, 1, 0.11)
  spotLight3.position.set(-9, 5.9, -1.4)
  spotLight3.name = "spotLight3"
  scene.add(spotLight3);

  const spotLight4 = new THREE.SpotLight(0xffffff, 2, 10, 0.47, 1, 0.11)
  spotLight4.position.set(0, 5.9, -9.5)
  spotLight4.name = "spotLight4"
  scene.add(spotLight4);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight4)
  // scene.add(spotLightHelper)

  window.requestAnimationFrame(() => {
    spotLightHelper.update()
  })


  // const spotlightProperties = {
  //   color: spotLight4.color.getHex(),
  //   intensity: spotLight4.intensity,
  //   distance: spotLight4.distance,
  //   angle: spotLight4.angle,
  //   penumbra: spotLight4.penumbra,
  //   positionX: spotLight4.position.x,
  //   positionY: spotLight4.position.y,
  //   positionZ: spotLight4.position.z,
  // };

  // gui.addColor(spotlightProperties, 'color').onChange(function (value) {
  //   spotLight4.color.setHex(value);
  // });

  // gui.add(spotlightProperties, 'intensity', 0, 2).onChange(function (value) {
  //   spotLight4.intensity = value;
  // });

  // gui.add(spotlightProperties, 'distance', 0, 100).onChange(function (value) {
  //   spotLight4.distance = value;
  // });

  // gui.add(spotlightProperties, 'angle', 0, Math.PI / 3).onChange(function (value) {
  //   spotLight4.angle = value;
  // });

  // gui.add(spotlightProperties, 'penumbra', 0, 1).onChange(function (value) {
  //   spotLight4.penumbra = value;
  // });
  // gui.add(spotlightProperties, 'positionX', -20, 20).onChange(function (value) {
  //   spotLight4.position.x = value;
  // });

  // gui.add(spotlightProperties, 'positionY', -20, 20).onChange(function (value) {
  //   spotLight4.position.y = value;
  // });

  // gui.add(spotlightProperties, 'positionZ', -20, 20).onChange(function (value) {
  //   spotLight4.position.z = value;
  // });

  let position = 0
  let mixer = null;
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    `/public/models/Model${paintingNumber}.glb`,
    (gltf) => {
      console.log("success");
      console.log("This is gltf: ", gltf);
      const glbmodel = gltf.scene;
      // gltf.scene.traverse(function (child) {
      //   if (child.isMesh) {
      //     child.material.envMap = scene.environment;
      //     console.log('This is environment');
      //   }
      // });

      // gltf.scene.traverse(function (node) {
      //   if (node.isLight) {
      //     scene.add(node);
      //   }
      //   console.log('This is node: ', node.isLight);
      // });



      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach(function (clip) {
        mixer.clipAction(clip).play();
      });

      //   model.position.set(0, -1, 10)
      // if(paintingNumber === "10") {
      //   // model.position.z = 15;
      //   model.position.y = -2;
      //   console.log('model position', model.position);
      // }
      glbmodel.name = 'catModel';
      console.log('model: ', glbmodel)
      gltf.scene.scale.set(5.25, 5.25, 5.25);
      // gltf.scene.scale.set(0.025, 0.025, 0.025); 
      // camera.position.set(0, 0, 20);
      scene.add(glbmodel)



      const clock = new THREE.Clock();
      let previousTime = 0;
      var rotationSpeed = 0.4;
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;
        //update mixer
        if (mixer !== null) {
          mixer.update(deltaTime);
        }
        window.requestAnimationFrame(() => {
          spotLightHelper.update();
        })


        var rotationAngle = rotationSpeed * deltaTime;
        glbmodel.rotation.y += rotationAngle;
        //  console.log('This is model: ', glbmodel);

        //renderer
        renderer.render(scene, camera);

        // controls.update();

        // console.log('This is update controls: ', controls.update());

        renderer.setAnimationLoop(animate);
      };
      animate();








    },
    () => {
      console.log("progress");
    },
    () => {
      console.log("error");
    });

};
