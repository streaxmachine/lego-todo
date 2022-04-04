import * as THREE from "three"
import Experience from "./Experience"
import gsap from "gsap"
import Lego from "./World/Lego"
import FormEvents from "./FormEvents"


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

    }
}