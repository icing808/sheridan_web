<template>
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
        <div>
        <div class="header">
        <b-button id="add" ref="show" :disabled="show" @click="show = true">
          <img src="../assets/tasks-add-task.png">
        </b-button>
        <h3>Tasks</h3>
        </div>
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
        <div>
            <div>{{msg}}</div>
            <b-card no-body>
                <b-tabs pills card align="center" class="mytabs">
                <b-tab title="Ongoing" @click="getAll(-1)" pill1>
                    <b-card-text>
                        <input type="hidden" v-model="q_status">
                        <div class="container" v-show="showAll">
                            <div  v-for="item in array" :key="item._id">

                                    <b-form-checkbox
                                        class="set-status c1"
                                        size="lg"
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="completed"
                                        unchecked-value="not_completed"
                                        >
                                    </b-form-checkbox>
                                    <div class="list">

                                    <div class="title-pri">
                                    <h3 id="title">Title: {{item.title}}</h3>
                                    <p id="priority" v-if="1 === item.level" > General</p>
                                    <p class="med" id="priority" v-else-if="2 === item.level" >Important</p>
                                    <p class="emg" id="priority" v-else-if="3 === item.level" >Emergent</p>
                                    <p class="low" id="priority" v-else>Low Priority</p>
                                    </div>
                                    <!-- <li>Content: {{item.content}}</li>
                                    <li>Start Time: {{item.start_time}}</li> -->
                                    <p id="duetime"><img id="timeicon" src="../assets/tasks-duetime-icon.png">  {{item.end_time}}</p>
                                    </div>

                                    <div class="btns">
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
                                    </div>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <b-tab class="completed" title="Completed" @click="getAll(2)">
                    <b-card-text>
                        <input type="hidden" v-model="q_status">
                        <div v-show="showAll">
                            <div v-for="item in array" :key="item._id">

                                <div>
                                    <!-- <li>UserId: {{item.user_id}}</li>
                                    <li v-if="1 === item.category_id" >Category: Study</li>
                                    <li v-else-if="2 === item.category_id" >Category: Work</li>
                                    <li v-else-if="3 === item.category_id" >Category: Other</li>
                                    <li v-else>Category: No Category</li> -->
                                    <img id="completed" src="../assets/checked.png">
                                    <h3 id="title">{{item.title}}</h3>
                                    <p id="priority" v-if="1 === item.level" >General</p>
                                    <p id="priority" v-else-if="2 === item.level" >Important</p>
                                    <p id="priority" v-else-if="3 === item.level" >Emergent</p>
                                    <p id="priority" v-else>Low Priority</p>
                                    <p id="duetime"><img id="timeicon" src="../assets/tasks-duetime-icon.png">  {{item.end_time}}</p>

                                    <!-- <li>Content: {{item.content}}</li> -->
                                    <!-- <li>Start Time: {{item.start_time}}</li> -->

                                    <!-- <li v-if="0 === item.status" >Status: Pending</li>
                                    <li v-else-if="1 === item.status" >Status: On going</li>
                                    <li v-else-if="2 === item.status" >Status: Finish</li>
                                    <li v-else-if="3 === item.status" >Status: Ignore</li>
                                    <li v-else-if="4 === item.status" >Status: Expire</li>
                                    <li v-else>Status: No Status</li> -->
                                     <!-- <li><button @click="deleteone(item._id)">Delete</button></li> -->
                                    <!-- <li v-show="doneBtnShow"><button @click="updateStatus(item._id)">Done</button></li> -->
                                </div>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                </b-tabs>
            </b-card>
        </div>
        </div>
        <template #overlay >
        <div id="temp">
            <h3 class="title t1">New Task</h3>
            <b-button class="cancel" ref="cancel" aria-describedby="cancel-label" @click="show = false">Cancel</b-button>
            <b-button class="done" @click="addTask">Done</b-button>
        </div>
        <div>
            <div class="underline u1" >
                <input type="text" v-model="title" placeholder="Title">
            </div>
            <div class="underline u2">
                <div class="title t2"><strong>Description</strong></div>
                <input type="text" v-model="content" placeholder="Content">
            </div>
            <div class="underline u3">
                <div class="title t2 "><strong>Start Date</strong></div><br>
                <!-- <input class="form-control" type="text" v-model="startTime" placeholder="Start Time"> -->
                <b-form-input type="date" v-model="startTime" class="form-control"></b-form-input>
            </div>
            <div class="underline u3">
                <div class="title t2"><strong>End Date</strong></div><br>
                <!-- <input class="form-control" type="text" v-model="endTime" placeholder="End Time"> -->
                <b-form-input type="date" v-model="endTime" class="form-control"></b-form-input>
            </div>

            <div class="barrage-size">
                <div class="title t2"><strong>Category:</strong></div><br><br>
                <div class="radio r1">
                <!-- <input type="radio" value="1" v-model="categoryId"> <span id="s-size">Study</span>
                <input type="radio" value="2" v-model="categoryId"> <span id="m-size">Work</span>
                <input type="radio" value="3" v-model="categoryId"> <span id="l-size">Other</span> -->
                <b-form-radio class="c1" name="categoryId" size="lg" value="1" v-model="categoryId"><p>Study</p></b-form-radio>
                <b-form-radio class="c1" name="categoryId" size="lg" value="2" v-model="categoryId"><p>Work</p></b-form-radio>
                <b-form-radio class="c1" name="categoryId" size="lg" value="3" v-model="categoryId"><p>Other</p></b-form-radio>
                </div>
            </div>
            <div>
                <div class="title t2"><strong>Level:</strong></div><br>
                <div class="radio">
                <!-- <input type="radio" value="1" v-model="level"> <span id="s-size">General</span>
                <input type="radio" value="2" v-model="level"> <span id="m-size">Important</span>
                <input type="radio" value="3" v-model="level"> <span id="l-size">Emergent</span> -->
                    <b-form-radio class="c2" name="level" size="lg" value="1" v-model="level"><p>General</p></b-form-radio>
                    <b-form-radio class="c2" name="level" size="lg" value="2" v-model="level"><p>Important</p></b-form-radio>
                    <b-form-radio class="c2" name="level" size="lg" value="3" v-model="level"><p>Emergent</p></b-form-radio>
                </div>
            </div>

      </div>
        </template>
    </b-overlay>
</template>
<script>
// import Footer from './Footer'
export default {
    name: "TaskList",
    // components:{
    //     Footer
    // },
    inject: ['reload'],
    data(){
        return{
            msg: '',
            array: [],
            show: false,
            showAll: false,
            q_status: '',
            status: 'not_accepted',
            intervalId: null
        }
    },
    methods:{
        addTask(){
          //alert("userId:"+this.GLOBAL.userId);
          this.showAll = false
          if(this.title == ""
              || this.content == ""
              || this.startTime == ""
              || this.endTime == ""
              || this.categoryId == ""
              || this.level == ""
          ){
              this.msg = "Each field is required"
              return
          }
          let params = {
              title: this.title,
              content: this.content,
              startTime: this.startTime,
              endTime: this.endTime,
              categoryId: this.categoryId,
              level: this.level,
              userId: this.GLOBAL.userId
          }
          this.$http.post('/api/task/addTask',params).then((res)=>{
              console.log(res)
              if(res.data.status == 1000){
                  alert(res.data.message)
                  this.msg = res.data.message
                  this.$router.push({
                      path: '/TaskList',
                      replace: true
                      });
              }else{
                  //alert(res.data.message)
                  this.msg = res.data.message
              }
          }).catch((err)=>{
              console.log(err)
          })
        },
        onShown() {
            // Focus the cancel button when the overlay is showing
            this.$refs.cancel.focus()
        },
        onHidden() {
            // Focus the show button when the overlay is removed
            this.$refs.show.focus()
        },
        getAll(statusId){
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

        },
        deleteone(ids){
            let params = {
                id: ids
            }
            this.$http.post('/api/task/delete',params).then((res) => {
                console.log(res)
                this.array = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        },
        updateStatus(ids, uStatus){
            let params = {
                id: ids,
                status: uStatus,
                q_status: this.q_status
            }
            this.$http.post('/api/task/updateStatus',params).then((res) => {
                console.log(res)
                console.log(res.data)
                if(res.data.status != null && 1000 != res.data.status){
                    this.msg = res.data.message
                    alert(this.msg)
                }else{
                    this.array = res.data
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        gotoAddTask(){
            this.$router.push({
                path: '/AddTask2',
                replace: true
            });
        },
        updateTask(tId){
            this.$router.push({
                       path: '/AddTask2?tId='+tId,
                       replace: true
            });
        },
        //Update task status in real time
        dataRefresh(){
          //Timer in progress, exit function
          if (this.intervalId != null){
            return;
          }
          //Timer is empty, execute lifecycle 5 mins
          this.intervalId = setInterval(() => {
            console.log("refresh:"+ new Date());
            this.updateTasksStatus();
          }, 300000);
        },
        updateTasksStatus(){
          //Database update data
          this.$http.get("/api/task/updateTasksStatus", {userId: this.GLOBAL.userId}).then((res)=>{
              this.getAll(this.q_status);
              console.log(res)
          }).catch((err)=>{
              console.log(err)
          })
        },
        //Stop Timer
        clear(){
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
    },
    created() {
        console.log('init Method:'+this.GLOBAL.userId);
          if(this.GLOBAL.userId == '' ){
              alert("Please Sign In");
              this.$router.push({
                path: '/Login',
                replace: true
              });
          }
        //alert(this.q_status);
        if(this.q_status == ""){
            this.q_status = -1;
        }
        this.getAll(this.q_status);
        this.dataRefresh();
    },
  //After the page is destroyed, clear the timer
  destroyed(){
    this.clear();
  }
}
</script>
<style scoped>
.hello-header{
  display: inline-flex;
}
.bor{
    border:1px solid red;
}
#add{
    position:absolute;
    left:8%;
    top:5%;
    background-color:white;
    border:none;
    outline: none;
}

h1, h2 {
  font-size:24px;
  font-weight: 800;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 1% 10px;
  color:#1B052F;
}
a {
  color: #42b983;
}

.container{
    /* border:1px solid black; */
    height:80px;
    width:100%;

}
.c1{
    position:relative;
    /* border:1px solid green; */
    display:inline-block;
    float:left;
    left:40px;
    top:20px;

}
/* .c1 :focus{
    box-shadow: 0 0 4px 1px #11C7BA;
} */
.list{
    position:relative;
    display:inline-block;
    width:300px;
    float:right;
    margin-right:-16px;
    padding:10px;
    box-shadow: 3px 3px 1px #F8F8F8;

}

.title-pri{
    /* border:1px solid pink; */
}
.low{
    color:#76EDE0;
}
.emg{
    color:#F79846;
}
.med{
    color:#B972B6;
}
#completed{
  position:relative;
  left:-11%;
}
.set-status{
   margin-left:-20%;
   color:#1FDAD2;
   /* margin-top:-1%; */
}

.btns{
    /* border:1px solid red; */
    flex-direction: row;
    width:400px;
    margin-left:42%;
    margin-top: -1%;
    margin-bottom: 3%;
}
#btn1{
    display: inline-block;
    border:none;
    float: left;

    /* margin-right:2%; */
    margin-bottom: 2%;
}
#btn2{
    border:none;
    display: inline-block;
    margin-bottom: 2%;
    background-color:#1FDAD2;
    color:white;

}
#title{
    font-size:18px;
    font-weight:800;
    text-align: left;
    /* margin-left: 42%; */
    margin-top:-1.8%;
}
#priority{
    margin-left: 20%;
    display: inline-block;
    float: right;
    /* margin-right: 38%; */
    margin-top:-10%;
}
#duetime{
    font-size:16px;
    font-weight:600;
    text-align: left;

    margin-bottom:2%;
}
#timeicon{
    margin-top:-.5%;
}
.ongoing{
   background-color:white;
   border:1px solid yellow;
}
.completed{

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

#temp{
    margin-top:50%;
    margin-left:-10%;
    /* border:1px solid red; */
    width:120%;
}
.title{
    font-size:20px;
    position:relative;
    float:left;
    margin-top:2%;
}
.t1{
    margin-left:10%
}
.t2{
    font-size:16px;
}

.cancel, .done{
    background-color:white;
    border:none;
    font-size:18px;
    outline: none;
}
.cancel{
    color:grey;
    margin-left:10%
}
.done{
    color: #11C7BA;
}
.underline{
    margin-top: 5%
}
.u1{
    margin-top:10%;
}
.u2 input{
    height:60px;
}
.u3 input{
    background-color:#F5F8F7;
}
.underline input{
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    width:290px;
    height:36px;
}
.u3 input:focus{
    box-shadow: 0 0 4px 1px #11C7BA;
}
.radio{
    position:relative;
    display:inline-block;
    font-size:12px;
    /* border:1px solid red; */
    width:110%;
}

.c1,.c2{
    /* border:1px solid red; */
    width:35%;
    float:left;
    margin-left:-3%;
}
.c1{
    width:32%;
    margin-left:-4%;
}
</style>
