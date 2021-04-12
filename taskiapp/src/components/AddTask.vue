<template>
    <div>
        <div>Add Task</div>
        <div>
            <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Todos from '../components/Todos';
export default {
  name: 'Home',
  components: {
    Todos
  },
  data() {
    return {
      todos: []
    }
  },

  // Used API for todo list JSON server
  // Reference: https://jsonplaceholder.typicode.com/
  
  methods: {
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed
      })
        .then(res => this.todos = [...this.todos, res.data])
        .catch(err => console.log(err));
    },

    deleteTodo(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(this.todos = this.todos.filter(todo => todo.id !== id))
        .catch(err => console.log(err));
    },
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(res => this.todos = res.data)
      .catch(err => console.log(err));
  }
}
</script>
<style scoped>
    
</style>
