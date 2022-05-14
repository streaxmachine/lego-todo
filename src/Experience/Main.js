import Lego from "./World/Lego"
import ToDoList from "./TodoList";
import Experience from "./Experience";
import gsap from "gsap";

export default class Main 
{
    constructor()
    {
      //3js
      this.experience = new Experience()
        this.resources = this.experience.resources
        this.resources.on("ready", ()=>
        {
            this.lego = new Lego()
        })


    this.todo = new ToDoList()
  
    let helpers = {
    addTodo: () => {
      let addTodoTextInput = document.getElementById('addTodoTextInput');
    
      if (addTodoTextInput.value.trim().length !== 0 ) {
        this.todo.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        main.displayTodos();
      }
    },
    deleteTodo: (position) => 
    {
      this.todo.deleteTodo(position)
      main.displayTodos();
    },
    deleteCompletedTodos: ()  =>
    {
      this.todo.deleteCompletedTodos()
      main.displayTodos();
    },

    toggleCompleted: (todo) => 
    {
      this.todo.toggleCompleted(todo)
      main.displayTodos();
    },

    updateTodo: (newTodoText , position) =>
    {
      this.todo.updateTextTodo(newTodoText , position)
    }
  };
  
  let main = {
    selectedFilter: 'AllTodos',
    displayTodos: () => {
      let todosUl = document.getElementById('todos');
     
      
      this.todo.filterTodos(main.selectedFilter)
  
      todosUl.innerHTML = '';
      
      this.todo.FiltermakeHTML(todosUl)
    },
    
    setUpEventListeners: () => {
      let addTodoTextInput = document.getElementById('addTodoTextInput');
      let todoMenu1 = document.getElementById('menu-main');
      let todosUl = document.getElementById('todos');
      let todoMenu2 = document.getElementById('todoMenu2');
      let p = document.getElementsByClassName("todo-text")
      
     
      addTodoTextInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          helpers.addTodo();
          this.setSaberColorAdd()
        }
      });
      
      todosUl.addEventListener('click', (event) => {
       
        let target = event.target;
       
        if (target.classList.contains('trash-button')) {
    
          let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode);
          helpers.deleteTodo(indexOfTodoElement);
          this.setSaberColordelete()
        }
  
        else if (target.classList.contains('checkbox')) {
         console.log("p" , p) 
          let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode.parentNode);
          helpers.toggleCompleted(this.todo.todoList.todos[indexOfTodoElement]);
        }
      });


      todosUl.addEventListener("focusout" , (event) => 
      {
        let target = event.target;
        console.log("clicked" , target)
        if (target.classList.contains("todo-text"))
        {
          console.log("fff")
          let indexOfTodoElement = this.todo.getTodoElementIndex(target.parentNode);
          helpers.updateTodo(target.textContent, indexOfTodoElement);
        }
      })
     

      todoMenu2.addEventListener('click', (event) => {
        let target = event.target;
        if (target.id === 'deleteCompletedBtn') {
          console.log(target.id)
          helpers.deleteCompletedTodos();
          this.setSaberColordeleteComplete()
        }
        else if (target.classList.contains('menu-2-button')) {
          let menu2ButtonElements = document.querySelectorAll('.menu-2-button');
          menu2ButtonElements.forEach(function(button) {
            button.classList.remove('active');
          });
          target.classList.add('active');
          main.selectedFilter = target.id;
          main.displayTodos();
        }
      });
    }
  };
  
  main.setUpEventListeners();
  main.displayTodos();
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