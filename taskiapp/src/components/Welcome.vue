<template>
  <div class="hello">
    <img src="../assets/welcome-logo.png" class="logo">
    <div>
      <img src="../assets/welcome-pic.png">
      <h1 id="hello">Hello!👋</h1>
      <p id="intro">Taski is a reliable and easy-to-use task manager that can help you optimize your schedule and productivity.</p>
      <div class="welcome-buttons">
        <b-button class="btn log">
          <router-link to="/Login" ><p id="p1">LOGIN</p></router-link>
      </b-button><br><br>
        <b-button class="btn snup">
          <router-link to="/SignUp"><p id="p2">SIGN UP</p></router-link>
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
.logo{
 position:relative;
 left:-100px;
 top:-20px;
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
#p1{
    color:white
}
#p2{
    color:black
}
#intro{
    width:294px;
    height:60px;
    margin-left:14%;
    text-align:left;
    color:#6D6B6B;
    font-size:15px;
    margin-bottom:8%;
}
#hello{
    font-weight:800;
    margin-top:6%;
}
</style>
