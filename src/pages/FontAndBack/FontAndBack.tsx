import * as React from "react";
import "./FontAndBack.less";
import * as THREE from "three";
import { useEffect } from 'utils/declare';
// const Three = window.THREE;
let dom:HTMLElement;
let width:number;
let height:number;
let render:any;
// tslint:disable-next-line:no-null-keyword
let camera = null;
// tslint:disable-next-line:no-null-keyword
let scene :any;
function FontAndBack(props:any) {
    
    const initThree = ()=>{
        dom = document.getElementById("canvas") as HTMLElement;
        width = dom.clientWidth;
        height = dom.clientHeight;
        render = new THREE.WebGLRenderer({
            antialias : true
        })
        render.setSize(width,height);
        dom.appendChild(render.domElement);
        render.setClearColor(0xFFFFFF, 1.0);
    }

    const initCamera = ()=> {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 500;
        // camera.lookAt({
        //     x : 0,
        //     y : 0,
        //     z : 0
        // });
    }

    const initScene = ()=> {
        scene = new THREE.Scene();
    }

    const initLight = ()=> {
        // @ts-ignore
        const light1 = new THREE.DirectionalLight(0xFFFFFF,1.5);
        light1.position.set(0,0,1);
        scene.add(light1);
        
    }



    useEffect(()=>{
        initThree();
        initCamera();
        initScene();
        initLight();
    },[])


    return<div className="canvas-container" id="canvas" />
}

export default FontAndBack;