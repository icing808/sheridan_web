<template>
  <div>
    <b-calendar block
      id="ex-disabled-readonly"
      hidden: true 
    ></b-calendar>

    <!-- Footer -->
      <div class="footer-container">
        <div class="footer">
            <b-button class="footer-button" @click="$router.push('Home').catch(err=>err)">
              <img src="../assets/TaskList-selected.png">
            </b-button>
            <b-button class="footer-button" @click="$router.push('Calendar')">
              <img src="../assets/calendar-normal.png">
            </b-button>
            <b-button class="footer-button" @click="$router.push('Account')">
              <img src="../assets/user-normal.png">
            </b-button>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Calender',
  data () {
    return {
      state: 'normal'
    }
  }
}
</script>

<style scoped>
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
