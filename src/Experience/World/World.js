import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Lego from "./Lego";

export default class World 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on("ready", ()=>
        {
            this.floor = new Floor()
            this.lego = new Lego()
            this.environment = new Environment()
        })
    }
}