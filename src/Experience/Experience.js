import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Resources from "./Utils/Resources"
import sources from "./sources"
import LegoForm from "./LegoForm"

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance 
        }

        instance = this

        //Global access
        window.experience = this

        //Option
        this.canvas = canvas

        //Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.legoForm = new LegoForm()
        
        this.sizes.on("resize", ()=>
        {
            this.resize()
        })

        this.time.on("tick", ()=> 
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
    }
}