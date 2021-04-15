<template>
  <div>
    <b-overlay
      show
      :opacity="0.3"
    >
      <img src="../assets/user-center-pic.png" class="account-bkg-img">

      <template #overlay>

        <div class="circle">
          <div class="name">Name</div>
        </div>

        <div>
          <div>Taski365@gmail.com</div>
          <b-button variant="light">
            <img src="../assets/user-edit-profile.png">
          </b-button>
        </div>

        <div>
          <b-button-group vertical>
            <b-button>View Task Statistics</b-button>
            <b-button>General</b-button>
            <b-button>Theme</b-button>
            <b-button>Notifications</b-button>
          </b-button-group>
        </div>

        <div>
          <b-button variant="outline-primary" @click="exitTaski">
            LOG OUT
          </b-button>
        </div>

      </template>
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
}

.circle{
  border-radius: 50%;
  width: 100px;
  height: 100px; 
  background: gray;
  margin-left: -150px;
}

.name{
  font-size: xx-large;
}
</style>