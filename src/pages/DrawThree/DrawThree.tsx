// 3d动态旋转动画
import * as React from "react";
import * as THREE from "three";
import * as Stats from "stats.js"
import "./DrawThree.less";
import { useEffect } from 'utils/declare';
import login from "assets/image/login/login-bak.png"
let renderer:any;
let camera:any;
let scene:any;
let width:number;
let height:number;
let stats:any;
let mesh:any;
let animating = false;

function DrawThree(props:any){

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
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 3;
        // camera.lookAt({
        //     x : 0,
        //     y : 0,
        //     z : 0
        // });
    }

    function initScene() {
        scene = new THREE.Scene();
    }

    function initLight() {
        // @ts-ignore
        const light1 = new THREE.DirectionalLight(0xFFFFFF,1.5);
        light1.position.set(0,0,1);
        scene.add(light1);
        
    }

    function initObject() {
        const map = THREE.ImageUtils.loadTexture(login);
        const material = new THREE.MeshPhongMaterial({map});
        const geometry = new THREE.CubeGeometry( 1, 1, 1 );
        mesh = new THREE.Mesh( geometry,material );
        mesh.rotation.x = Math.PI / 5;
        mesh.rotation.y = Math.PI / 5;
        scene.add( mesh );
        // window.addEventListener( 'resize', onWindowResize, false );
        addMouseHandal();

    }

    const addMouseHandal = ()=>{
        const dom = renderer.domElement;
        dom.addEventListener("mouseup",onMouseUp,false)
    }

    const onMouseUp = (e:any)=>{
        e.preventDefault();
        animating = !animating; 
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
        initLight();
        initObject();
        animation();
    }

    function animation()
    {
        // renderer.clear();
        // camera.position.x =camera.position.x +1;
        renderer.render(scene, camera);
        if(animating){
            mesh.rotation.y -= .01;
        }
        requestAnimationFrame(animation);
        stats.update();
    }


    return (
        <div className="drawthree-container">
            <div id="canvas-frame" />
        </div>
    )

}

export default DrawThree;