window.addEventListener("DOMContentLoaded", init);

var controls;
var renderer;
var camera;

function init() {
    // const polyfill = new WebVRPolyfill();

    const width = 960;
    const height = 540;
    // const width = document.getElementById('myCanvasRapper').getBoundingClientRect().width;
    // const height = document.getElementById('myCanvasRapper').getBoundingClientRect().height;

    // document.getElementById('myCanvas').getBoundingClientRect().width = width;
    // document.getElementById('myCanvas').getBoundingClientRect().height = height;

    // $('#myCanvas').attr('width', width);
    // $('#myCanvas').attr('height', height);

    // レンダラーを作成
    // レンダラーを作成
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas")
    });
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.xr.enabled = true;

    const container = document.getElementById('myCanvasRapper');
    // container.style.position = "relative";
    // container.style.width = width;
    // container.style.height = height;
    container.appendChild(VRButton.createButton( renderer ));
  
    // シーンを作成
    scene = new THREE.Scene();
  
    // カメラを作成
    camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      10000
    );
    camera.position.set(0, 0, 5);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;
  
    // 箱を作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0000ff
    });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = '../resource/models/CubicRoom1.glb';
    

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            // model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0, 0, 0);
            scene.add(gltf.scene);

            // model["test"] = 100;
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
            console.log(error.message);
        }
    );
  
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
      0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
  
    // 初回実行
    // tick();
    renderer.setAnimationLoop(tick);
}

function tick() {
    // controls.update();
    renderer.render(scene, camera);
    // requestAnimationFrame(tick);
}