<template>
  <div class="hello">
    <img src="../assets/welcome-logo.png" class="logo">
    <div>
      <img src="../assets/welcome-pic.png">
      <h1 id="hello">Hello!</h1>
      <p id="intro">Lorem ipsum dolor sit amet, consect adiposing elit, sed do eiusmod temttingcig ut laborer et dolore magna al.</p>
      <div class="welcome-buttons">
        <b-button class="btn log">
          <router-link to="/Login" class="p1">LOGIN</router-link>
      </b-button><br><br>
        <b-button class="btn snup">
          <router-link to="/SignUp" class="p2">SIGN UP</router-link>
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
.btn{
    width: 280px;
    height: 40px;
    border:none;
}
.log{
    background:linear-gradient(to right, #04B4EE,#1ED9D3);
    color:white;
}
.snup{
    border:2px solid transparent;
    border-image:linear-gradient(to right, #04B4EE,#1ED9D3);
    border-image-slice:1;
    background-color:white;
    border-radius:8px;
}
.p1{
    color:white
}
.p2{
    color:black
}
#intro{
    margin-left:16%;
    margin-right:13%;
    text-align:left;
    color:#6c757d;
    font-size:14px;
    margin-bottom:4%;
}
#hello{
    margin-top:6%;
}
</style>
