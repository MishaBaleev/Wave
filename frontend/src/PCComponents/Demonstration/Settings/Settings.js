import "./Settings.scss";
import fig_1 from "./img/fig_1.png";
import fig_2 from "./img/fig_2.png";
import { useEffect } from "react"
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Settings  = (props) => {

    const initModel = () => {
        let container = document.querySelector('.three')
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth/container.offsetHeight, 0.1, 10000);
        camera.position.x = 0.47571388443342927
        camera.position.y = 0.38488341648429664
        camera.position.z = 1.0419026134301785
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 0)
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        const loader = new GLTFLoader()
        loader.load(
            "./drone/scene.gltf",
            (gltf) => {
                const root = gltf.scene 
                root.scale.x = 4
                root.scale.y = 4
                root.scale.z = 4
                scene.add(root)

                const animate = function () {
                    requestAnimationFrame(animate);
                    root.rotation.y += 0.005;
                    renderer.render(scene, camera);
                };
                animate();
            }
        )

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

        const controls = new OrbitControls( camera, renderer.domElement )
        controls.enablePan = false
        controls.enableZoom = false
        controls.update()
    }

    useEffect(() => {
        initModel()
    })

    return <div className="settings">
        <div className="three"/>
        <div className="section">
            <img src={fig_1} alt="fig_1"/>
            <p className="description">БАС (беспилотная авиационная система) — искусственный мобильный объект, не имеющий на борту экипажа и способный самостоятельно целенаправленно перемещаться в пространстве для выполнения различных функций в автономном режиме или посредством дистанционного управления.</p>
        </div>
        <div className="section">
            <div className="text_block">
                <p className="description">Для подбора конфигурации БПЛА, сборщику потребуется определится со следующими параметрами:</p>
                <ul className="list">
                    <li>- Ценовой диапазон</li>
                    <li>- Цели применения</li>
                    <li>- Максимальная грузоподъемность</li>
                    <li>- Максимальное время полета</li>
                    <li>- Максимальное расстояние, которое устройство сможет преодолеть</li>
                </ul>
            </div>
            <img src={fig_2} alt="fig_2"/>
        </div>
    </div>
}
export default Settings