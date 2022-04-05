import * as THREE from "three"
import gsap from "gsap"
import Experience from "../Experience"

export default class Preloader 
{
    constructor()
    {
        this.experience = new Experience()
        const loadingBarElement = document.querySelector('.loading-bar')
        const todoList = document.querySelector('.center')
        const StarWars = document.querySelector('.desc')
        console.log(todoList)
        const overlayGeometry = new THREE.PlaneBufferGeometry(5, 5, 1, 1)
        const overlayMaterial = new THREE.MeshBasicMaterial({color: "black" , opacity: 1 , transparent: true})
        const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
        this.experience.scene.add(overlay)
        overlay.position.z = 3
        this.loadingManager = new THREE.LoadingManager(
            () =>
            {
                // Wait a little
                window.setTimeout(() =>
                {
                    // Animate overlay
                    gsap.to(overlay.material, { duration: 2, opacity: 0, delay: 1.5 })
        
                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended')
                    // todoList.style.opacity = 1
                    gsap.to(todoList, { opacity: 1 , delay: 1.5 , duration: 2} );
                    gsap.to(StarWars, { opacity: 0 , delay: 0.5 , duration: 1} );

                    loadingBarElement.style.transform = ''
                }, 2000)
            },
        
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                // Calculate the progress and update the loadingBarElement
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )   
    }
}