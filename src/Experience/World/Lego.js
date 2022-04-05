import * as THREE from "three"
import Experience from "../Experience"


export default class Lego
{
    constructor()
    {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera.instance
        this.mouse = {}

        this.resourcesLego = this.resources.items.lego
        this.resourcesCapeTexture = this.resources.items.legoCape
        this.resourcesFloorRough = this.resources.items.floorRough

        this.setMaterail()
        this.setLegoModel()

        window.addEventListener("mousemove" , (event) => 
        {   
 
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1

            var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
            vector.unproject(this.camera);
            var dir = vector.sub(this.camera.position).normalize();
            var distance = -this.camera.position.z / dir.z;
            var pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

            this.head.lookAt(new THREE.Vector3(pos.x * 0.3, -1000 , 1)) 
        })
    }

    setMaterail()
    {

    this.LightSaberMat = new THREE.MeshPhysicalMaterial({
        color: "#120202" ,
        emissive: new THREE.Color(1 , 0 , 0), 
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide})
        

    this.capeMat = new THREE.MeshStandardMaterial({ map: this.resourcesCapeTexture , 
        bumpMap: this.resourcesCapeTexture , 
        bumpScale: 30 , 
        color:"#16171a" })
    this.capeMat.flipY = false
    this.capeMat.encoding = THREE.sRGBEncoding
    }

    setLegoModel()
    {
        this.legoModel = this.resourcesLego.scene
        this.legoModel.position.x = 0.3
        this.legoModel.position.z = -0.3
        this.legoModel.rotation.y = -0.2
        const capeMesh = this.legoModel.getObjectByName("Cape")
        const LightSaber = this.legoModel.getObjectByName("LightSaber")
        this.head = this.legoModel.getObjectByName("UniqueID_25")
        capeMesh.material = this.capeMat
        LightSaber.material = this.LightSaberMat
        
        if(this.experience.sizes.width < 500)
        {
            this.legoModel.position.x = -0.7
            this.legoModel.rotation.y = 0.1
        }

        this.scene.add(this.legoModel)
    }

}