<template>
  <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
    <div>
      <input type="checkbox" v-on:change="markComplete" v-bind:checked="todo.completed">
      {{todo.title}}
      <button @click="$emit('del-todo', todo.id)" class="del">
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    markComplete() {
      this.todo.completed = !this.todo.completed;
    }
  }
}
</script>

<style scoped>
  .todo-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }

   .is-complete {
    text-decoration: line-through;
  }
  
  .del{
    float: right;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
</style>

