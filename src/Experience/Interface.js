import Lego from "./World/Lego"
import Main from "./Main";
import ToDoList from "./TodoList";
import Experience from "./Experience";
import gsap from "gsap";

export default class Interface 
{
    constructor()
    {

        this.addTodoTextInput = document.getElementById('addTodoTextInput');
        this.todosUl = document.getElementById('todos');
        this.todoMenu2 = document.getElementById('todoMenu2');

        //3js
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.resources.on("ready", ()=>
        {
            this.lego = new Lego()
        })

        this.mainClass = new Main()
        this.helpers = this.mainClass.helpers
        this.main = this.mainClass.main    
        
        // this.todo = new ToDoList() 
        this.todo = this.mainClass.todo
        
        this.setUpEventListeners();
        // this.mainClass.main.displayTodos()
    };

    setUpEventListeners = () => {
        this.addTodoTextInput.addEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            this.helpers.addTodo();
            this.setSaberColorAdd()
          }
        });
        
        this.todosUl.addEventListener('click', (event) => {
         
          let target = event.target;
         
          if (target.classList.contains('trash-button')) {
      
            let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode);
            this.helpers.deleteTodo(indexOfTodoElement);
            this.setSaberColordelete()
          }
    
          else if (target.classList.contains('checkbox')) {

            let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode.parentNode);
            this.helpers.toggleCompleted(this.todo.todoList.todos[indexOfTodoElement]);
          }
        });
  
  
        this.todosUl.addEventListener("focusout" , (event) => 
        {
          let target = event.target;
          console.log("clicked" , target)
          if (target.classList.contains("todo-text"))
          {
            console.log("fff")
            let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode);
            this.helpers.updateTodo(target.textContent, indexOfTodoElement);
          }
        })
       
  
        this.todoMenu2.addEventListener('click', (event) => {
          let target = event.target;
          if (target.id === 'deleteCompletedBtn') {
            console.log(target.id)
            this.helpers.deleteCompletedTodos();
            this.setSaberColordeleteComplete()
          }
          else if (target.classList.contains('menu-2-button')) {
            let menu2ButtonElements = document.querySelectorAll('.menu-2-button');
            menu2ButtonElements.forEach(function(button) {
              button.classList.remove('active');
            });
            target.classList.add('active');
            this.main.selectedFilter = target.id;
            this.main.displayTodos();
          }
        });
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
            gsap.to(this.lego.LightSaberMat , {  emissiveIntensity: 0.6 , duration: 1})
            gsap.to(this.lego.LightSaberMat , {delay: 1,  emissiveIntensity: 0.1 , duration: 1.3})

        }
    }

    setSaberColordeleteComplete()
    {
        if(this.lego)
        {
            gsap.to(this.lego.LightSaberMat , {  emissiveIntensity: 6, duration: 1})
            gsap.to(this.lego.LightSaberMat , { delay: 1,  emissiveIntensity: 2 , duration: 1})

        }
    }
}