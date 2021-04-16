<template>
  <div>
    <b-calendar block
      id="ex-disabled-readonly"
      hidden: true 
    ></b-calendar>

    <div>
      <div id="title1">Tasks</div>
      <div>
            <b-card-text>
              <input type="hidden" v-model="q_status">
              <div class="container" v-show="showAll">
                  <div  v-for="item in array" :key="item._id">
                    <!-- <b-form-checkbox
                        class="set-status c1"
                        size="lg"
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="completed"
                        unchecked-value="not_completed"
                        >
                    </b-form-checkbox> -->
                    <div class="list">

                    <div class="title-pri">
                    <h3 id="title">Title: {{item.title}}</h3>
                    <p id="priority" v-if="1 === item.level" > General</p>
                    <p class="med" id="priority" v-else-if="2 === item.level" >Important</p>
                    <p class="emg" id="priority" v-else-if="3 === item.level" >Emergent</p>
                    <p class="low" id="priority" v-else>Low Priority</p>
                    </div>
                    <p id="duetime">
                      <img id="timeicon" src="../assets/tasks-duetime-icon.png">  
                      {{item.end_time}}
                    </p>
                    </div>

                    <!-- <div class="btns">
                        <div v-if="0 === item.status">
                            <button id="btn2" @click="updateTask(item._id)">Edit</button>
                        </div>
                        <div v-if="0 === item.status || 1 === item.status">
                            <button id="btn1" @click="updateStatus(item._id, 3)">Cancel</button>
                        </div>
                        <div v-if="1 === item.status">
                            <button id="btn2" @click="updateStatus(item._id, 2)">Done</button>
                        </div>
                        <div v-if="0 === item.status || 3 === item.status || 4 === item.status">
                            <button id="btn1" @click="deleteone(item._id)">Delete</button>
                        </div>
                    </div> -->
                  </div>
              </div>
            </b-card-text>
      </div>

      <div id="title2">Completed</div>
      <div>
          <b-card-text>
            <input type="hidden" v-model="q_status">
            <div v-show="showAll">
                <div v-for="item in array" :key="item._id">
                    <div class="list2">
                        <div class="title-pri">
                        <!-- <img id="completed" src="../assets/checked.png"> -->
                        <h3 id="title">{{item.title}}</h3>
                        <p id="priority" v-if="1 === item.level" >General</p>
                        <p class="med" id="priority" v-else-if="2 === item.level" >Important</p>
                        <p class="emg" id="priority" v-else-if="3 === item.level" >Emergent</p>
                        <p class="low" id="priority" v-else>Low Priority</p>
                        </div>
                        <p id="duetime"><img id="timeicon" src="../assets/tasks-duetime-icon.png"> {{item.end_time}}</p>
                    </div>
                </div>
            </div>
          </b-card-text>
      </div>
    </div>

    <!-- Footer -->
      <div class="footer-container">
        <div class="footer">
            <b-button class="footer-button" @click="$router.push('Home').catch(err=>err)">
              <img src="../assets/TaskList-normal.png">
            </b-button>
            <b-button class="footer-button" @click="$router.push('Calendar')">
              <img src="../assets/calendar-selected.png">
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
      state: 'normal',
      array: [],
      showAll: false,
      status:'not_accepted',
      q_status: ''
    }
  },
  methods: {
    getAll: function(statusId){
      this.q_status = statusId;
      let params = {
          status: statusId,
          userId: this.GLOBAL.userId
      }
      this.$http.post('/api/task/all', params).then((res) => {
          console.log(res)
          if(res.data.length>0){
              this.showAll = true
              this.array = res.data
              this.msg = ""
          }else{
              this.msg = "No any task！"
              this.array = []
          }
      }).catch((err) => {
          console.log(err)
      })
    }
  },
  created(){
    this.getAll(-1);
    this.getAll(2);
  }
}
</script>

<style scoped>
#title1,#title2{
  font-size:20px;
  font-weight: 800;
  margin-top: 4%;
  margin-bottom:4%;
  margin-left:-60%;

}
#title2{
  margin-left:-52%;
  margin-top: 8%;
}
.title-pri{
  /* border:1px solid red; */
  width:280px;
  text-align: left;
  flex-direction: row;
  display: inline-block;
}
#title{
 font-size:18px;
 font-weight:800;
}
.low{
    color:#76EDE0;
    font-weight: 600;
}
.emg{
    color:#F79846;
    font-weight: 600;
}
.med{
    color:#B972B6;
    font-weight: 600;
}
#priority{
  float: right;
  margin-top: -10%;
}
.list{
  padding-top: 2%;
  margin-bottom:6%;
  margin-left: 1%;
  width:340px;
  height: 80px;
  /* border:1px solid red; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 4px 4px 0 rgba(0, 0, 0, 0.04);
}
.list2{
  padding-top: 2%;
  margin-bottom:4%;
  margin-left: 4%;
  width:340px;
  height: 80px;
  /* border:1px solid red; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 4px 4px 0 rgba(0, 0, 0, 0.04);
}
#duetime{
  position: relative;
  left:-25%;
  font-weight: 600;
}
.footer-container{
   width:100%;
   /* border:1px solid red; */
   display: flex;
   align-items: center; 
   justify-content: center;  
}

.footer{
  width:100%;
  position:fixed;
  bottom: 0;
  background-color: white;
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
