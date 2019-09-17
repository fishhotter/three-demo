// 3d动态旋转动画
import * as React from "react";
import * as THREE from "three";
import * as Stats from "stats.js"
import * as dat from 'dat.gui';
import "./LightSpot.less";
import { useEffect } from 'utils/declare';
let renderer:any;
let camera:any;
let scene:any;
let width:number;
let height:number;
let stats:any;
let light1:any;
let params:any;
// let mesh:any;

function LightSpot(props:any){
    const gui = new dat.GUI();
    useEffect(()=>{
        stats = new Stats();
        const dom = document.getElementById('canvas-frame') as HTMLElement;
        dom.appendChild(stats.domElement);
        threeStart()
    },[])


    function initThree() {
        const dom = document.getElementById('canvas-frame') as HTMLElement;
        width = dom.clientWidth;
        height = dom.clientHeight;
        // @ts-ignore
        renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.setSize(width, height);
        dom.appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF, 1.0);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
        camera.position.x = 600;
        camera.position.y = 0;
        camera.position.z = 600;
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.lookAt({
            x : 0,
            y : 0,
            z : 0
        });
    }

    function initScene() {
        scene = new THREE.Scene();
    }

    function paramsObj (this: any){
        this.x = 0;
        this.y = 0;
        this.z = 1000;
        this.decay = .5;
        this.distance = 1000;
        this.intensity = 1;

    }

    function initGui(){
        // @ts-ignore
        params = new paramsObj();
        gui.add(params,"x",0,1000).name("x移动");
        gui.add(params,"y",0,1000).name("y移动");
        gui.add(params,"z",0,1000).name("z移动");
        gui.add(params,"decay",0,1).name("衰减");
        gui.add(params,"distance",-2000,2000).name("距离");
        gui.add(params,"intensity",0,1).name("强度");
    }

    function initLight() {
        if(light1){
            scene.remove(light1);
        }
        light1 = new THREE.PointLight(0xFFFFFF,params.intensity,params.distance,params.decay);
        light1.position.set(params.x,params.y,params.z);
        console.log(params,light1.intensity,light1.distance,light1.decay,light1.position);
        scene.add(light1);
    }

    function initObject() {
        const geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
        const material = new THREE.MeshLambertMaterial( { color:0xFF0000} );
        const mesh = new THREE.Mesh( geometry,material);
        mesh.position.set(0,0,0);
        scene.add(mesh);

        const geometry2 = new THREE.CubeGeometry( 200, 100, 50,4,4);
        const material2 = new THREE.MeshLambertMaterial( { color:0xFF0000} );
        const mesh2 = new THREE.Mesh( geometry2,material2);
        mesh2.position.set(-300,0,0);
        scene.add(mesh2);

        const geometry3 = new THREE.CubeGeometry( 200, 100, 50,4,4);
        const material3 = new THREE.MeshLambertMaterial( { color:0xFF0000} );
        const mesh3 = new THREE.Mesh( geometry3,material3);
        mesh3.position.set(0,-150,0);
        scene.add(mesh3);

        const mesh4 = new THREE.Mesh( geometry3,material3);
        mesh4.position.set(0,150,0);
        scene.add(mesh4);

        const mesh5 = new THREE.Mesh( geometry3,material3);
        mesh5.position.set(300,0,0);
        scene.add(mesh5);

        const mesh6 = new THREE.Mesh( geometry3,material3);
        mesh6.position.set(0,0,-100);
        scene.add(mesh6);

    }

    // function onWindowResize() {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    // }

    function threeStart() {
        initThree();
        initCamera();
        initScene();
        initGui()
        initLight();
        initObject();
        animation();
    }

    function animation()
    {
        // renderer.clear();
        // camera.position.x =camera.position.x +1;
        initLight();
        
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
        stats.update();
    }


    return (
        <div className="light-spot-container">
            <div id="canvas-frame" />
        </div>
    )

}

export default LightSpot;