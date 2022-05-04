import * as THREE from "three"
import Experience from "./Experience"
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes        
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.SetInstance()
        this.SetBloom()
    }

    SetInstance()
    {
        this.instance = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: false
        })

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure = 1.5
        // this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    SetBloom()
    {
        this.renderTarget = new THREE.WebGLRenderTarget(
            1920,
            1080
            , 
            {
                minFilter: THREE. LinearFilter,
                magFilter: THREE. LinearFilter,
                format: THREE.RGBAFormat, 
                encoding: THREE.sRGBEncoding
        
            }
        )
        
         this.effectComposer = new EffectComposer(this.instance, this.renderTarget)
         this.renderPass = new RenderPass(this.scene , this.camera.instance)
         this.effectComposer.addPass(this.renderPass)
         this.filmPass = new FilmPass(
            0.5,   // noise intensity
            0.025,  // scanline intensity
            648,    // scanline count
            false,  // grayscale
        );

        this.filmPass.renderToScreen = true;
        this.effectComposer.addPass(this.filmPass);

        this.unrealBloomPass = new UnrealBloomPass()
        this.unrealBloomPass.strength = 1.3
        this.unrealBloomPass.radius = 1.5
        this.unrealBloomPass.threshold = 0.15
        this.unrealBloomPass.enabled = true
        
        // this.effectComposer.addPass(this.unrealBloomPass)

    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        // this.effectComposer.render()
        this.instance.render(this.scene , this.camera.instance)
    }
}