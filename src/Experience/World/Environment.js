import * as THREE from "three"
import Experience from "../Experience";

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunLight()
        // this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.ambientLight = new THREE.AmbientLight( "white" , 0.2 ); // soft white light
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight( "#d6d6d6", 0.6);
        this.directionalLight.castShadow = false
        this.directionalLight.shadow.normalBias = 0.05
        this.directionalLight.shadow.camera.far = 15
        this.directionalLight.position.set(-5.208,0.6499, 2.8628 );
        this.directionalLight.rotation.set( 4.6852, 0, 0 );
        this.scene.add( this.directionalLight );

        this.directionalLight2 = new THREE.DirectionalLight( "#5a5c5c", 0.5);
        this.directionalLight2.position.set( -1.9536,0.9102, -0.5217 );

        this.scene.add(this.directionalLight2)

        this.directionalLight3 = new THREE.DirectionalLight( "#5a5c5c", 0.06);
        this.directionalLight3.castShadow = false
        this.directionalLight3.position.set(4.5551, 1.5611 , -2.6045 );
        this.scene.add(this.directionalLight3)

        this.directionalLight4 = new THREE.DirectionalLight( "#5a5c5c", 0.5);
        this.directionalLight4.castShadow = false
        this.directionalLight4.position.set(-0.6519, 3.3835 , -5.0778 );
        this.scene.add(this.directionalLight4)

        this.pointLight = new THREE.PointLight( "#3f4d4c", 0.5 );
        this.pointLight.position.set( -1.3028, 1.0404, 0.2593 );
        this.scene.add(this.pointLight );

        this.pointLight2 = new THREE.PointLight( "white", 0.2);
        this.pointLight2.position.set( -2.3441, -0.2614 , 0.5197 );
        this.scene.add(this.pointLight2)

        this.pointLight3 = new THREE.PointLight( "red", 0.2);
        this.pointLight3.position.set( -0.001, 0.9102 ,0.1292 );
        this.scene.add(this.pointLight3)
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.060
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = ()=>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })

        }

        this.environmentMap.updateMaterial()
    }

}