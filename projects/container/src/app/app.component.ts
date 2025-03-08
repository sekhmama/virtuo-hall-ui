import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import stars from '../space.jpeg';

@Component({
  selector: 'app-container-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'container';
   constructor(private window: Window){}
  
    ngAfterViewInit(): void {

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-90,140,140 );
    orbit.update();

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      // stars,stars,stars,stars,stars,stars
    ])
    const textureLoader = new THREE.TextureLoader();

    function animate() {
        renderer.render( scene, camera );
      }
      
      // rotating cube
      // const width = window.innerWidth, height = window.innerHeight;
      
      // // init
      
      // const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
      // camera.position.z = 1;
      
      // const scene = new THREE.Scene();
      
      // const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      // const material = new THREE.MeshNormalMaterial();
      
      // const mesh = new THREE.Mesh( geometry, material );
      // scene.add( mesh );
      
      // const renderer = new THREE.WebGLRenderer( { antialias: true } );
      // renderer.setSize( width, height );
      // renderer.setAnimationLoop( animate );
      // document.body.appendChild( renderer.domElement );
      
      // // animation
      
      // function animate( time: number ) {
      
      //   mesh.rotation.x = time / 2000;
      //   mesh.rotation.y = time / 1000;
      
      //   renderer.render( scene, camera );
      
      // }
    }
}
