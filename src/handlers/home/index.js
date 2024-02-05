import '~/style/home/index.less'


import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import loadManager from '../../modules/home/loadManager';


// const vertexShader = `
// attribute float scale;
// void main() {
//     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//     gl_PointSize = scale * ( 300.0 / - mvPosition.z );
//     gl_Position = projectionMatrix * mvPosition;
// }
// `;
// const fragmentShader = `
//   uniform vec3 color;
//   void main() {
//       if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
//       gl_FragColor = vec4( color, 1.0 );
//   }
// `;
let currentFBX = 0, timer = null, isAnimation = false;
const fbxTweens = [];

(async () => {

  let fbxArray = await loadManager(['./fbox/test6.fbx', './fbox/test9.fbx', './fbox/test10.fbx']).catch(() => {
    console.error('加载fbx资源失败')
  });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 400);
  // camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //材质
  var geometry = new THREE.BufferGeometry();
  geometry.tween = [];
  const pointsNumber = Math.max.apply(null, [30000].concat(fbxArray.map((item) => Math.ceil(item.length / 3))))
  // console.log(pointsNumber)
  // var positions = new Float32Array(pointsNumber * 3);
  // var scales = new Float32Array(pointsNumber);
  var vertices = [];
  for (let i = 0; i < pointsNumber; i++) {
    const position = THREE.MathUtils.randFloatSpread(800);
    geometry.tween.push(new TWEEN.Tween({ position }).easing(TWEEN.Easing.Exponential.In))

    // var x = THREE.MathUtils.randFloatSpread(800);
    // var y = THREE.MathUtils.randFloatSpread(800);
    // var z = THREE.MathUtils.randFloatSpread(800);
    // positions[i] = x;
    // positions[i + 1] = y;
    // positions[i + 2] = z;
    vertices.push(position)

    // var size = THREE.MathUtils.randFloatSpread(40);
    // scales[i] = Math.abs(size);


  }
  // var geometry = new THREE.BufferGeometry();
  // geometry.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(positions, 3)
  // );
  // geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
  );

  // const material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     color: { value: new THREE.Color(0xffffff) },
  //   },
  //   vertexShader,
  //   fragmentShader
  // });

  const points = new THREE.Points(geometry, new THREE.PointsMaterial({
    // size: 0.03,
    size: 4,
    color: 0xffffff,
    alphaTest: 0.1,
    opacity: 0.5,
    transparent: true,
    depthTest: true,
    // blending: THREE.AdditiveBlending // 设置混合模式
  }));
  // const points = new THREE.Points(geometry, material)

  scene.add(points);



  // var geometry2 = new THREE.BufferGeometry();
  // var vertices2 = [];
  // for (let i = 0; i < 1000; i++) {
  //   const position2 = THREE.MathUtils.randFloatSpread(500);

  //   vertices2.push(position2)
  // }

  // geometry2.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(new Float32Array(vertices2), 3)
  // );


  // const points2 = new THREE.Points(geometry2, new THREE.PointsMaterial({
  //   // size: 0.03,
  //   size: 2,
  //   color: 0xffffff,
  //   alphaTest: 0.1,
  //   opacity: 0.5,
  //   transparent: true,
  //   depthTest: true,
  //   // blending: THREE.AdditiveBlending // 设置混合模式
  // }));

  // scene.add(points2)
  const controls = new OrbitControls(camera, renderer.domElement);


  document.body.appendChild(renderer.domElement);

  setTimeout(() => { trans(), isAnimation = true }, 5000)
  const render = () => {
    TWEEN.update();
    requestAnimationFrame(render);
    // setTimeout(render,16.7)
    // const a = Math.round(Math.random() * 100)
    // console.log(points.rotation.y, 'asdasdasdsadsadas')
    if (isAnimation) {
      scene.rotation.y = 0
      // points.rotation.y = 0;
    } else {
      // points.rotation.y += 0.0014;
      // points2.rotation.y += 0.0014;
      scene.rotation.y += 0.0014;
    }
    renderer.render(scene, camera);
    controls.update();
  }
  // window.points = points;

  render()

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize, false);

  // var tween
  const trans = () => {

    // console.log(geometry.getAttribute("position"))
    for (let i = 0, j = 0; i < pointsNumber; i++, j++) {
      const item = geometry.tween[i];
      item.stop();
      if (j >= fbxArray[currentFBX].length) {
        j = 0;
      }
      item.to({ position: fbxArray[currentFBX][j] }, Math.round(THREE.MathUtils.randFloat(1000, 4000))).onUpdate((obj) => {
        geometry.attributes.position.array[i] = obj.position;
        geometry.attributes.position.needsUpdate = true;
      }).start(undefined, true);
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      trans()
    }, 1000 * 10)


    currentFBX = (currentFBX + 1) % 3

  }

  window.trans = trans;
})()
