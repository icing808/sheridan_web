<template>
    <div>
        <h1>Task List</h1>
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
        <div>{{msg}}</div>
        
        <p><router-link to="/AddTask2">Add Task</router-link></p>
        <p><router-link to="/Home">Home</router-link></p>
    </div>
</template>
<script>
export default {
    name: "TaskList",
    inject: ['reload'],
    data(){       
        return{
            msg: '',
            array: [],
            showAll: false,
            delBtnShow: true,
            doneBtnShow: true,
            q_status: ''
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>