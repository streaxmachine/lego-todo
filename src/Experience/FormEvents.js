import * as THREE from "three"
import Experience from "./Experience"

export default class FormEvents
{
    constructor()
    {   
        this.experience = new Experience()
        this.todoList = document.querySelector(".todo-list")
        this.todoInput = document.querySelector(".todo-input")
        this.todoButton = document.querySelector(".todo-button")
        this.filterOption = document.querySelector(".filter-todo")
        this.lego = this.experience.lego

        this.setupAddtoDo()
        this.deleteCheck()
        this.filterTodo()
    }

    setupAddtoDo()
    { 
        this.todoButton.addEventListener("click" , (event)=>
        {
            event.preventDefault()
            //ToDo DIV

                console.log(this.lego)

            const todoDiv = document.createElement("div")
            todoDiv.classList.add("todo")
            //Li

            const newTodo = document.createElement("li")
            newTodo.innerText = this.todoInput.value
            newTodo.classList.add("todo-item")
            todoDiv.appendChild(newTodo)

            //ADDtodo

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
            console.log(e.target.classList)
            if(item.classList[0] === "trash-btn")
        {
            const todo = item.parentElement
            //Animation
            todo.classList.add("fall")
            todo.addEventListener("transitionend" , function(){
                todo.remove()
            })
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
}