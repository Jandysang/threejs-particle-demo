import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
export default (urls = []) => {
    return new Promise((resolve, reject) => {
        const manager = new THREE.LoadingManager();
        const loader = new FBXLoader(manager);
        let res = []
        manager.onLoad = () => {
            // setTimeout(()=>{
            //     resolve(res)
            // },5000)
            resolve(res)
        }
        manager.onError = () => {
            reject(res)
        }
        urls.forEach((url, index) => {
            ((_url, _index) => {
                loader.load(_url, (fbx) => {
                    fbx.traverse((c) => {
                        if (c.isMesh) {
                            //   c.geometry.scale(0.02,0.02,0.02)
                            const { array } = c.geometry.attributes.position;
                            res[_index] = array;
                        }
                    })
                })
            })(url, index)

        })

        for (var i = 0; i < 10; i++) {
            ((_i)=>{
                setTimeout(() => {
                    console.log(_i)
                }, 100)
            })(i)
        }
    })
}