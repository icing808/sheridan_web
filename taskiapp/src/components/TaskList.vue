<template>
    <div>
        <div class="header">
        <b-button id="add" ref="show" :disabled="show" @click="show = true">
          <img src="../assets/tasks-add-task.png">
        </b-button>
        <h3>Tasks</h3>
        </div>
        <div>
            <b-card no-body>
                <b-tabs pills card align="center" class="mytabs">
                <!-- <b-tab title="All" active @click="getAll(-1)">
                    <b-card-text>
                        <input type="hidden" v-model="q_status">
                        <div v-show="showAll">
                            <p v-for="item in array" :key="item._id">
                                
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="accepted"
                                        unchecked-value="not_accepted"
                                    >
                                    I accept the terms and use
                                    </b-form-checkbox>
                                
                                <ul>
                                    <li>UserId: {{item.user_id}}</li>
                                    <li v-if="1 === item.category_id" >Category: Study</li>
                                    <li v-else-if="2 === item.category_id" >Category: Work</li>
                                    <li v-else-if="3 === item.category_id" >Category: Other</li>
                                    <li v-else>Category: No Category</li>

                                    <li v-if="1 === item.level" >Level: General</li>
                                    <li v-else-if="2 === item.level" >Level: Important</li>
                                    <li v-else-if="3 === item.level" >Level: Emergent</li>
                                    <li v-else>Level: No Level</li>

                                    <li>Title: {{item.title}}</li>
                                    <li>Content: {{item.content}}</li>
                                    <li>Start Time: {{item.start_time}}</li>
                                    <li>End Time: {{item.end_time}}</li>
                                    <li v-if="0 === item.status" >Status: Pending</li>
                                    <li v-else-if="1 === item.status" >Status: On going</li>
                                    <li v-else-if="2 === item.status" >Status: Finish</li>
                                    <li v-else-if="3 === item.status" >Status: Ignore</li>
                                    <li v-else-if="4 === item.status" >Status: Expire</li>
                                    <li v-else>Status: No Status</li>
                                    <li v-show="delBtnShow"><button @click="deleteone(item._id)">Delete</button></li>
                                    <li v-show="doneBtnShow"><button @click="updateStatus(item._id)">Done</button></li>
                                </ul>
                            </p>
                        </div>
                    </b-card-text>
                </b-tab> -->
                <b-tab  title="Ongoing" @click="getAll(1)" pill1>
                    <b-card-text>
                        <input type="hidden" v-model="q_status">
                        <div v-show="showAll">
                            <div v-for="item in array" :key="item._id">
                                
                                    <!-- <li>UserId: {{item.user_id}}</li> -->
                                    <!-- <li v-if="1 === item.category_id" >Category: Study</li>
                                    <li v-else-if="2 === item.category_id" >Category: Work</li>
                                    <li v-else-if="3 === item.category_id" >Category: Other</li>
                                    <li v-else>Category: No Category</li> -->
                                    <b-form-checkbox
                                        class="set-status"
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="completed"
                                        unchecked-value="not_completed"
                                        >
                                    </b-form-checkbox>
                                    <h3 id="title">Title: {{item.title}}</h3>
                                    <p id="priority" v-if="1 === item.level" > General</p>
                                    <p id="priority" v-else-if="2 === item.level" >Important</p>
                                    <p id="priority" v-else-if="3 === item.level" >Emergent</p>
                                    <p id="priority" v-else>Low Priority</p>
                                    <!-- <li>Content: {{item.content}}</li>
                                    <li>Start Time: {{item.start_time}}</li> -->
                                    <p id="duetime"><img id="timeicon" src="../assets/tasks-duetime-icon.png">  {{item.end_time}}</p>
                                    <!-- <li v-if="0 === item.status" >Status: Pending</li>
                                    <li v-else-if="1 === item.status" >Status: On going</li>
                                    <li v-else-if="2 === item.status" >Status: Finish</li>
                                    <li v-else-if="3 === item.status" >Status: Ignore</li>
                                    <li v-else-if="4 === item.status" >Status: Expire</li>
                                    <li v-else>Status: No Status</li> -->
                                    <div class="btns">
                                        <div v-show="delBtnShow"><button id="btn1" @click="deleteone(item._id)">Delete</button></div>
                                        <div v-show="doneBtnShow"><button id="btn2" @click="updateStatus(item._id)">Done</button></div>
                                    </div>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <b-tab title="Completed" @click="getAll(2)">
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
                                    <div v-show="delBtnShow"><button @click="deleteone(item._id)">Delete</button></div>
                                    <!-- <li v-show="doneBtnShow"><button @click="updateStatus(item._id)">Done</button></li> -->
                                </div>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                </b-tabs>
            </b-card>
        </div>
        <!-- <h1>Task List</h1>
        <button @click="getAll(-1)">Get All Task</button>
        <button @click="getAll(0)">Get Pending Task</button>
        <button @click="getAll(1)">Get On going Task</button>
        <button @click="getAll(2)">Get Finish Task</button>
        <input type="hidden" v-model="q_status">
        <div v-show="showAll">
            <p v-for="item in array" :key="item._id">
                <ul>
                    <li>UserId: {{item.user_id}}</li>
                    <li v-if="1 === item.category_id" >Category: Study</li>
                    <li v-else-if="2 === item.category_id" >Category: Work</li>
                    <li v-else-if="3 === item.category_id" >Category: Other</li>
                    <li v-else>Category: No Category</li>

                    <li v-if="1 === item.level" >Level: General</li>
                    <li v-else-if="2 === item.level" >Level: Important</li>
                    <li v-else-if="3 === item.level" >Level: Emergent</li>
                    <li v-else>Level: No Level</li>

                    <li>Title: {{item.title}}</li>
                    <li>Content: {{item.content}}</li>
                    <li>Start Time: {{item.start_time}}</li>
                    <li>End Time: {{item.end_time}}</li>
                    <li v-if="0 === item.status" >Status: Pending</li>
                    <li v-else-if="1 === item.status" >Status: On going</li>
                    <li v-else-if="2 === item.status" >Status: Finish</li>
                    <li v-else-if="3 === item.status" >Status: Ignore</li>
                    <li v-else-if="4 === item.status" >Status: Expire</li>
                    <li v-else>Status: No Status</li>
                    <li v-show="delBtnShow"><button @click="deleteone(item._id)">Delete</button></li>
                    <li v-show="doneBtnShow"><button @click="updateStatus(item._id)">Done</button></li>
                </ul>
            </p>
        </div>
        <div>{{msg}}</div> -->
        <!-- <Footer /> -->
        <!-- <p><router-link to="/AddTask2">Add Task</router-link></p>
        <p><router-link to="/Home">Home</router-link></p> -->
    </div>
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
            showAll: false,
            delBtnShow: true,
            doneBtnShow: true,
            q_status: '',
            status: 'not_accepted'
        }
    },
    methods:{
        getAll(statusId){
            this.q_status = statusId;
            let params = {
                status: statusId
            }
            this.$http.post('/api/task/all', params).then((res) => {
                console.log(res)
                if(res.data.length>0){
                    this.showAll = true
                    this.array = res.data
                    this.msg = ""
                    if(statusId == 2){
                        this.delBtnShow = false
                        this.doneBtnShow = false
                    } else if (statusId == 1){
                        this.delBtnShow = false
                        this.doneBtnShow = true
                    } else {
                        this.delBtnShow = true
                        this.doneBtnShow = true
                    }
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
        updateStatus(ids){
            let params = {
                id: ids,
                status: 2,
                q_status: this.q_status
            }
            this.$http.post('/api/task/updateStatus',params).then((res) => {
                console.log(res)
                console.log(res.data)
                //alert(res.data.data)
                this.array = res.data
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        //alert(this.q_status);
        if(this.q_status == ""){
            this.q_status = -1;
        }
        this.getAll(this.q_status);
    }
}
</script>
<style scoped>
#add{
    position:absolute;
    left:38%;
    top:7%;
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
    margin-left: 42%;  
    margin-top:-1.8%;
}
#priority{
    margin-left: 20%;
    display: inline-block;
    float: right;
    margin-right: 38%;
    margin-top:-1.8%;
}
#duetime{
    font-size:16px;
    font-weight:600;
    text-align: left;
    margin-left: 42%;
    margin-bottom:2%;
}
#timeicon{
    margin-top:-.5%;
}


</style>