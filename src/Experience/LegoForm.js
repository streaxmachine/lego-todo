import * as THREE from "three"
import Experience from "./Experience"
import gsap from "gsap"
import Lego from "./World/Lego"


export default class LegoForm
{
    constructor()
    {

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.resources.on("ready", ()=>
        {
            this.lego = new Lego()
        })

        this.setSaberColor()

        window.addEventListener("click" , ()=>
        {
            this.setSaberColor()
        })
        
    }

    setSaberColor()
    {
        if(this.lego)
        {
            // this.lego.LightSaberMat.color = new THREE.Color("green")
            gsap.to(this.lego.LightSaberMat , {emissiveIntensity: 2 , duration: 5})
        }
    }
}