<template>
  <div class="hello">
    <div class="hello-header">
      <b-button>
        <img src="../assets/tasks-add-task.png">
      </b-button>
      <h1>Tasks</h1>
    </div>

    <div>
      <img src="../assets/tasks-empty-pic.png">
    </div>

    <div>
      <p>Press "+" to create a new task, they'll show up here in chronological order.</p>
    </div>

    <!-- TODO: Add statement when have tasks -->

    <!-- <h1>{{ msg }}</h1>
    <h1>Hi, {{ this.GLOBAL.userName }}</h1>
    <ul>
      <li>
       <router-link to="/TaskList">Task List</router-link>
      </li>
      <li>
        <router-link to="/AddTask2">Add Task</router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Taski App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-header{
  display: inline-flex;
}

/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
