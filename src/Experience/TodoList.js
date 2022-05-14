export default class ToDoList
{
    constructor()
    {
        this.todoList = 
        {
            todos: [],
            filteredTodos: [],
        };

    }

    addTodo = (todoText) =>
    {
        // console.log(this.todoList.todos)
        this.todoList.todos.push(
            {
                todoText : todoText,
                completed: false
            }
        )
    }
    
    deleteTodo = (position) =>
    {
        this.todoList.todos.splice(position , 1)
    }

    deleteCompletedTodos = () =>
    {
        for (var i = this.todoList.todos.length - 1; i >= 0; i--) 
        {
            if (this.todoList.todos[i].completed === true) 
            {
                console.log("splicing")
              this.deleteTodo(i);
            }
        }
    }

    toggleCompleted = (todo) =>
    {
        todo.completed = !todo.completed;
    }

    updateTextTodo = (newTodoText , position) =>
    {
        console.log("pos" , position)
        
        this.todoList.todos[position].todoText = newTodoText
        // console.log(newTodoText)
    }

    filterTodos = (selectedFilter) => {
      switch(selectedFilter) {
        case 'AllTodos':
          this.todoList.filteredTodos = this.todoList.todos;
          break;
        case 'UncompletedTodos':
          this.todoList.filteredTodos = this.todoList.todos.filter((todo) =>{
            return todo.completed == false;
          });
          break;
        case 'CompletedTodos':
          this.todoList.filteredTodos = this.todoList.todos.filter((todo) =>{
            return todo.completed == true;
          });
          break;
      }
    }

    FiltermakeHTML = (todosUl) =>
    {

        this.todoList.filteredTodos.forEach ((todo) => {
          // console.log("ddd",this.todoList.filteredTodos)
        


          let todoLabel = this.createTodoLabel(todo);
          let deleteButton = this.createDeleteButton();
          let todoLi = document.createElement('li');
          let checkbox = this.createCheckbox(todo);
        
        todoLi.className = 'todo';
        
        todoLi.appendChild(checkbox);
        todoLi.appendChild(todoLabel);
        todoLi.appendChild(deleteButton);
        todosUl.appendChild(todoLi);
        
        if (todo.completed === true) {
          checkbox.querySelector('input').checked = true;
          todoLabel.classList.add('todo-checked-text');
        }
        
        todo.elementReference = todoLi;
      });
    }

    createCheckbox = () => {
   
      let checkboxMain = document.createElement('div');
      let checkbox = document.createElement('input');
      let span = document.createElement('span')
      
      checkboxMain.className = 'pretty';
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      span.className = 'checkmark'
  
      checkboxMain.appendChild(checkbox);
      checkboxMain.appendChild(span);

      return checkboxMain;
    }

    createTodoLabel = (todo) => {
      let todoLabel = document.createElement('label');
      todoLabel.textContent = todo.todoText;
      todoLabel.className = 'todo-text';
      todoLabel.contentEditable = true;
      return todoLabel;
    }

    createDeleteButton = () => {
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i></i>';
      deleteButton.className = 'trash-button';
      return deleteButton;
    }

    getTodoElementIndex = (todoElement) => 
    {
      let todo = this.todoList.todos.find((todo) => 
      {
        return todo.elementReference == todoElement;
      });
      return this.todoList.todos.indexOf(todo);
    }
}