import * as THREE from "three"
import Experience from "../Experience";
import {Reflector} from 'three/examples/jsm/objects/Reflector'


export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes

        //Setup
        this.resourcesFloor = this.resources.items.floor
        this.resourcesFloorTexture = this.resources.items.floorBaked
        this.resourcesFloorRough = this.resources.items.floorRough

        this.setScaneFog()
        this.setMirror()
        this.setFloor()
    }

    setMirror()
    {
        let gMGeo = new THREE.PlaneBufferGeometry(50,50, 1, 1)
        let groundMirror = new Reflector(gMGeo, {
        clipBias: 0.1,
        textureWidth: this.sizes.width * this.sizes.pixelRatio,
        textureHeight: this.sizes.height * this.sizes.pixelRatio,
        color: "white",
        recursion: 0.001, 
        encoding: THREE.sRGBEncoding
        });

        groundMirror.position.y = -0.01;
        
        groundMirror.rotation.x = THREE.MathUtils.degToRad(-90)
        this.scene.add(groundMirror)
    }

    setFloor()
    {
        this.model = this.resourcesFloor.scene
        this.resourcesFloorTexture.offset.set(-0.0803 , -0.0803)
        this.resourcesFloorTexture.flipY = false
        this.resourcesFloorTexture.encoding = THREE.sRGBEncoding
        let floor = this.model.getObjectByName("floor")
        floor.material = new THREE.MeshStandardMaterial({ 
            map: this.resourcesFloorTexture , 
            roughnessMap: this.resourcesFloorRough , 
            roughness: 5 - 2
        })
        floor.material.transparent = true
        floor.material.opacity = 0.92

        this.scene.add(this.model)
    }

    setScaneFog()
    {
        this.scene.fog = new THREE.Fog("black", 15/3, 20/3)
    }

    


}