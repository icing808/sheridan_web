<template>
  <div>
    <b-overlay
      show
      :opacity="0.3"
    >
      <img src="../assets/user-center-pic.png" class="account-bkg-img">

      <template #overlay>

        <div class="circle">
          <div class="name">Ta</div>
        </div>

        <div class="account">
          <div><p class="text">Taski365@gmail.com</p></div>
          <b-button class="edit" variant="light">
            <img src="../assets/user-edit-profile.png">
          </b-button>
        </div>

        <div>
          <b-list-group class="list">
            <b-list-group-item class="listBtn" button @click="$router.push('Report')">View Task Statistics<img class="check1" src="../assets/user-center-check.png"></b-list-group-item>
            <b-list-group-item class="listBtn" button disabled>General<img class="check2" src="../assets/user-center-check.png"></b-list-group-item>
            <b-list-group-item class="listBtn" button disabled>Theme<img class="check3" src="../assets/user-center-check.png"></b-list-group-item>
            <b-list-group-item class="listBtn" button disabled>Notifications<img class="check4" src="../assets/user-center-check.png"></b-list-group-item>
          </b-list-group>
          <!-- <b-button-group vertical class="list">
            <b-button class="btn" @click="$router.push('Report')">View Task Statistics</b-button>
            <b-button class="btn">General</b-button>
            <b-button class="btn">Theme</b-button>
            <b-button class="btn">Notifications</b-button>
          </b-button-group> -->
        </div>

        <div>
          <b-button class="logout" variant="outline-primary" @click="exitTaski">
            LOG OUT
          </b-button>
        </div>

      </template>

      <!-- Footer -->
      <div class="footer-container">
        <div class="footer">
            <b-button class="footer-button" @click="$router.push('Home')">
              <img src="../assets/TaskList-normal.png">
            </b-button>
            <b-button class="footer-button" @click="$router.push('TaskList')">
              <img src="../assets/calendar-normal.png">
            </b-button>
            <b-button class="footer-button" @click="$router.push('Account').catch(err=>err)">
              <img src="../assets/user-selected.png">
            </b-button>
        </div>
      </div>

    </b-overlay>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      msg: 'Welcome to Taski App',
      show: true
    }
  },
  methods: {
    exitTaski(){
          this.GLOBAL.userId = '';
          this.GLOBAL.userName = '';
          this.GLOBAL.userEmail = '';
          this.$router.push({
            path: '/Login',
            replace: true
          });
        }
  },
}
</script>

<style scoped>
.account-bkg-img{
  margin-left: 5em;
  margin-top: 16%;
}

.circle{
  border-radius: 50%;
  width: 100px;
  height: 100px; 
  background: #7B2076;
  margin-left: -4%;
  margin-top:160%;
  color:white;
  text-align: center;
  line-height: 100px;
}

.name{
  font-size: xx-large;
}
.text,.listBtn{
  font-size: 20px;
  color:#1B052F;
}
.logout{
  width: 280px;
  height: 40px;
  border:1px solid #9A3294;
  color:#9A3294;
  margin-top: 30%;
}
.account{
  width:280px;
  /* border:1px solid red; */
  text-align: left;
  flex-direction: row;
  display: inline-block;
  margin-top: 10%;
  
}
.edit{
  float: right;
  margin-top: -18%;
}
.list{
  background-color: none;
  border:none;
  width:290px;
  text-align: left;
  margin-top: 20%;
}
.check1{
  margin-left: 19%;
}
.check2{
  margin-left: 58%;
}
.check3{
  margin-left: 61%;
}
.check4{
  margin-left: 41%;
}

.footer-container{
   width:100%;
   /* border:1px solid red; */
   display: flex;
   align-items: center; 
   justify-content: center;  

}
.footer{
  position:fixed;
  bottom: 2%;
  /* margin-left:8%; */
}

.footer-button{
  display: inline-block;
  justify-content: space-around;
  margin:0 20px;
  background-color: white;
  border:none;
}
</style>