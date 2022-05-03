export default class ToDoList
{
    constructor()
    {
        this.todoList = 
        {
            todos: [],
        };

    }

    addTodo = (todoText) =>
    {
        console.log(this.todoList.todos)
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

}