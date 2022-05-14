import Lego from "./World/Lego"
import ToDoList from "./TodoList";
import Experience from "./Experience";
import gsap from "gsap";

export default class Main 
{
    constructor()
    {
      
    this.todo = new ToDoList()
  
    this.helpers = {
    addTodo: () => {
      let addTodoTextInput = document.getElementById('addTodoTextInput');
    
      if (addTodoTextInput.value.trim().length !== 0 ) {
        this.todo.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        this.main.displayTodos();
      }
    },
    deleteTodo: (position) => 
    {
      this.todo.deleteTodo(position)
      this.main.displayTodos();
    },
    deleteCompletedTodos: ()  =>
    {
      this.todo.deleteCompletedTodos()
      this.main.displayTodos();
    },

    toggleCompleted: (todo) => 
    {
      this.todo.toggleCompleted(todo)
      this.main.displayTodos();
    },

    updateTodo: (newTodoText , position) =>
    {
      this.todo.updateTextTodo(newTodoText , position)
    }
  };
  
  this.main = {
    selectedFilter: 'AllTodos',
    displayTodos: () => {
      let todosUl = document.getElementById('todos');
     
      
      this.todo.filterTodos(this.main.selectedFilter)
  
      todosUl.innerHTML = '';
      
      this.todo.FiltermakeHTML(todosUl)
    },
    
  };
}
}