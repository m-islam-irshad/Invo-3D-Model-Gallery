import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupExtra } from './extra';
import { scene, setupScene } from './scene';


const model = document.getElementById("img_container");

export const renderHideModel = (controls) => {
  const model = document.getElementById("model");
  model.style.display = "none"; // Hide the menu

};

export const renderModel = (paintingNumber) => {
  console.log('This is paining numer: ', paintingNumber)
  // const scene = new THREE.Scene()
  // const model = document.getElementById("model");
  let { camera, controls, renderer } = setupScene();
  // model.style.display = "block"; // Show the menu
  // var object = scene.getObjectByName( "camera", true );
  const modeletc = scene.getObjectByName('catModel')
  scene.remove(modeletc)
  
  const spotLight1Remove = scene.getObjectByName('spotLight1');
  scene.remove(spotLight1Remove)
  
  const spotLight2Remove = scene.getObjectByName('spotLight2');
  scene.remove(spotLight2Remove)
  
  const spotLight3Remove = scene.getObjectByName('spotLight3');
  scene.remove(spotLight3Remove)
  
  const spotLight4Remove = scene.getObjectByName('spotLight4');
  scene.remove(spotLight4Remove)

  renderer.renderLists.dispose();
  
  
  setupExtra(scene, camera, renderer, paintingNumber)

};


// Lock the pointer (controls are activated) and hide the menu when the experience starts
export const startExperience = (controls) => {
  // controls.lock(); // Lock the pointer (controls are activated)
  renderHideModel();
};

export const setupModelButton = (controls) => {
  const playButton = document.getElementById("view-model"); // Get the reference
  playButton.addEventListener("click", () => startExperience(controls)); // Add the click event listener to the play button to start the experience
};
