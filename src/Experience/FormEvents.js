import * as THREE from "three"
import Experience from "./Experience"
import LegoForm  from "./LegoForm"
import Lego from "./World/Lego"
import gsap from "gsap"

export default class FormEvents
{
    constructor()
    {   
        this.experience = new Experience()
        this.todoList = document.querySelector(".todo-list")
        this.todoInput = document.querySelector(".todo-input")
        this.todoButton = document.querySelector(".todo-button")
        this.filterOption = document.querySelector(".filter-todo")

        this.deleteCheck()
        this.setupAddtoDo()
        this.filterTodo()

        this.legoForm = new LegoForm()
        this.resources = this.experience.resources
        this.resources.on("ready", ()=>
        {
            this.lego = new Lego()
        })
    }

    setupAddtoDo()
    { 
        this.todoButton.addEventListener("click" , (event)=>
        {
            event.preventDefault()
            //ToDo DIV

            const todoDiv = document.createElement("li")
            todoDiv.classList.add("todo")
            //Li

            const newTodo = document.createElement("li")
            newTodo.innerText = this.todoInput.value
            newTodo.classList.add("todo-item")
            todoDiv.appendChild(newTodo) 
            //ADDtodo
            this.setSaberColorAdd()
            //Check Mark Button

            const completedButton = document.createElement("button")
            completedButton.innerHTML = '<i class = "fas fa-check"><i>'
            completedButton.classList.add("complete-btn")
            todoDiv.appendChild(completedButton)

            //Check Trash Button

            const trashButton = document.createElement("button")
            trashButton.innerHTML = '<i class = "fas fa-trash"><i>'
            trashButton.classList.add("trash-btn")
            todoDiv.appendChild(trashButton)
            //APPENT TO LIST

            this.todoList.appendChild(todoDiv)
            //Clear Todo input VALUE

            this.todoInput.value = ""
               
        })
    }

    deleteCheck()
    {
        this.todoList.addEventListener("click" , (e) =>
        {
            const item = e.target
            if(item.classList[0] === "trash-btn")
            {
                const todo = item.parentElement
                //Animation
                todo.classList.add("fall")
                todo.addEventListener("transitionend" ,() =>{
                todo.remove()
                })
                this.setSaberColordelete()
            }
        
        if(item.classList[0] === "complete-btn"){
            const todo = item.parentElement
            todo.classList.toggle("completed")
        }
        })
    }

    filterTodo()
    {
        this.filterOption.addEventListener("click" , (e)=>
        {
            const todos = this.todoList.childNodes;
            todos.forEach( (todo) => { 
                const todoStyle = todo.style;  
                if(todoStyle != undefined && todoStyle != null){
                    switch (e.target.value) {
                        case "all":
                            todoStyle.display = "flex";
                            break;
                        case "completed":
                            if (todo.classList.contains('completed')) {
                                todoStyle.display = 'flex';
                            } else {
                                todoStyle.display = "none";
                            }
                            break;
                        case "uncompleted":
                            if (todo.classList.contains('completed')){
                                todoStyle.display = 'none';
                            }
                            else{
                                todoStyle.display = "flex";
                            }
                            break;
                    }
                }
            })   
        })
    }

    setSaberColorAdd()
    {
        if(this.lego)
        {
            gsap.to(this.lego.LightSaberMat , {emissiveIntensity: 3 , duration: 1})
            gsap.to(this.lego.LightSaberMat , {delay: 1, emissiveIntensity: 1.2 ,duration: 1})
        }
    }

    setSaberColordelete()
    {
        if(this.lego)
        {
            gsap.to(this.lego.LightSaberMat , { delay: 0.5 , emissiveIntensity: 0.6 , duration: 1})
            gsap.to(this.lego.LightSaberMat , { delay: 1 , emissiveIntensity: 0.1 , duration: 1.3})

        }
    }
}