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
  const modeli = scene.getObjectByName('catModel')
    // console.log('This is obj: ', modeli );
    scene.remove(modeli)
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
