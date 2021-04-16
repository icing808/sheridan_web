<template>
  <div>
    <b-calendar block
      id="ex-disabled-readonly"
      hidden: true 
    ></b-calendar>

    <div>
      <div id="title1">Tasks</div>
      <div>
        {{msg}}
            <b-card-text>
              <div class="container" v-show="showAll">
                  <div  v-for="item in array1" :key="item._id">
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
                    <p class="gen" id="priority" v-if="1 === item.level" > General</p>
                    <p class="med" id="priority" v-else-if="2 === item.level" >Important</p>
                    <p class="emg" id="priority" v-else-if="3 === item.level" >Emergent</p>
                    <p class="low" id="priority" v-else>Low Priority</p>
                    </div>
                    <div class="col-md-12 duetime">
                          <img id="timeicon" src="../assets/tasks-duetime-icon.png"> 
                          {{item.start_time}} ~
                          {{item.end_time}} 
                    </div>
                      <div class="col-md-12">
                          <button v-if="0 === item.status" @click="updateTask(item._id)" class="btn btn-primary btn-sm" > Edit </button>
                          <button v-if="1 === item.status" @click="updateStatus(item._id, 2)" class="btn btn-success btn-sm" > Done </button>
                          <button v-if="0 === item.status || 1 === item.status" @click="updateStatus(item._id, 3)" class="btn btn-warning btn-sm" > Cancel </button>
                          <button v-if="0 === item.status || 3 === item.status || 4 === item.status" @click="deleteone(item._id)" class="btn btn-danger btn-sm" > Delete </button>
                      </div>
                    </div>
                  </div>
              </div>
            </b-card-text>
      </div>

      <div id="title2">Completed</div>
      <div>
          <b-card-text>
            <div v-show="showAll">
                <div v-for="item in array2" :key="item._id">
                    <div class="list2">
                        <div class="title-pri">
                        <!-- <img id="completed" src="../assets/checked.png"> -->
                        <h3 id="title">{{item.title}}</h3>
                        <p class="gen" id="priority" v-if="1 === item.level" >General</p>
                        <p class="med" id="priority" v-else-if="2 === item.level" >Important</p>
                        <p class="emg" id="priority" v-else-if="3 === item.level" >Emergent</p>
                        <p class="low" id="priority" v-else>Low Priority</p>
                        </div>
                        <div class="col-md-12 duetime">
                          <img id="timeicon" src="../assets/tasks-duetime-icon.png"> 
                          {{item.start_time}} ~
                          {{item.end_time}} 
                        </div>
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
      array1: [],
      array2: [],
      showAll: false,
      status:'not_accepted'
    }
  },
  methods: {
    updateTask(tId){
        this.$router.push({
            path: '/AddTask2?tId='+tId,
            replace: true
        });
    },
    deleteone(ids){
        let params = {
            id: ids,
            userId: this.GLOBAL.userId
        }
        this.$http.post('/api/task/delete',params).then((res) => {
            console.log(res)
            //this.array = res.data.data
            this.getAll(-1);
            this.getAll(2);
        }).catch((err) => {
            console.log(err)
        })
    },
    updateStatus(ids, uStatus){
        let params = {
            id: ids,
            status: uStatus,
            userId: this.GLOBAL.userId
        }
        this.$http.post('/api/task/updateStatus',params).then((res) => {
            console.log(res)
            console.log(res.data)
            if(res.data.status != null && 1000 != res.data.status){
                this.msg = res.data.message
                alert(this.msg)
            }else{
                //this.array = res.data
                this.getAll(-1);
                this.getAll(2);
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    getAll: function(statusId){
      let params = {
          status: statusId,
          userId: this.GLOBAL.userId
      }
      this.$http.post('/api/task/all', params).then((res) => {
          console.log(res)
          if(res.data.length>0){
              this.showAll = true
              if(2 == statusId){
                this.array2 = res.data
              }else{
                this.array1 = res.data
              }
              this.msg = ""
          }else{
              this.msg = "No any task！"
              if(2 == statusId){
                this.array2 = []
              }else{
                this.array1 = []
              }
          }
      }).catch((err) => {
          console.log(err)
      })
    }
  },
  created(){
    if(this.GLOBAL.userId == '' ){
        alert("Please Sign In");
        this.$router.push({
          path: '/Login',
          replace: true
        });
    }
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
.gen{
    color:#464545;
    font-weight: 600;
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
  padding-bottom: 2%;
  margin-bottom:6%;
  margin-left: 4%;
  margin-right: 4%;
  width:80%;
  /* height: 80px; */
  /* border:1px solid red; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 4px 4px 0 rgba(0, 0, 0, 0.04);
}
.list2{
  padding-top: 2%;
  padding-bottom: 2%;
  margin-bottom:4%;
  margin-left: 4%;
  margin-right: 4%;
  width:80%;
  /* height: 80px; */
  /* border:1px solid red; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 4px 4px 0 rgba(0, 0, 0, 0.04);
}
.duetime{
  font-weight: 600;
  margin-bottom:2%;
  color: #6D6B6B;
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
