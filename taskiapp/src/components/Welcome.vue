<template>
  <div class="hello">
    <img src="../assets/welcome-logo.png" class="logo">
    <div>
      <img src="../assets/welcome-pic.png">
      <h1>Hello!</h1>
      <p>Lorem ipsum dolor sit amet, consect adiposing elit, sed do eiusmod temttingcig ut laborer et dolore magna al.</p>
      <div class="welcome-buttons">
        <b-button>
          <router-link to="/Login">LOGIN</router-link>
        </b-button>
        <b-button>
          <router-link to="/SignUp">SIGN UP</router-link>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Taski App'
    }
  }
}
</script>

<style scoped>
.welcome-buttons{

}
</style>
