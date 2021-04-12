<template>
  <div class="todo-item">
    <div>
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
}
</script>

<style scoped>
  .todo-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }

  .del{
    float: right;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
</style>

