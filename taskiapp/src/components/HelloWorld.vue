<template>
  <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
    <div class="hello">
      <div class="hello-header">
        <b-button id="add" ref="show" :disabled="show" @click="show = true">
          <img src="../assets/tasks-add-task.png">
        </b-button>
        <h3>Tasks</h3>
      </div>

      <div>
        <img class="cup" src="../assets/tasks-empty-pic.png">
      </div>

      <div id="intro">
        <p>Press "+" to create a new task, they'll show up here in chronological order.</p>
        <p>
          <b-button @click="exitTaski">Exit</b-button>
          <router-link to="/TaskList">Taskis</router-link>
        </p>
      </div>


      <!-- TODO: Add statement when have tasks -->

      <!-- Footer -->
      <div class="footer">
          <b-button class="footer-button" @click="$router.push('Home').catch(err=>err)">
            <img src="../assets/TaskList-selected.png">
          </b-button>
          <b-button class="footer-button" @click="$router.push('TaskList')">
            <img src="../assets/calendar-normal.png">
          </b-button>
          <b-button class="footer-button" @click="$router.push('Account')">
            <img src="../assets/user-normal.png">
          </b-button>
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
import * as echarts from 'echarts'

export default {
  name: 'HelloWorld',
  data(){
        return{
            msg: '',
            title: '',
            content: '',
            startTime: '',
            endTime: '',
            categoryId: '',
            level: '',
            array: [],
            showAll: false,
            show: false,
            // charts: '',
            opinion:['Pending', 'On going', 'Completed', 'Ignore', 'Expired']           
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
    created() {
          console.log('init Method:'+this.GLOBAL.userId);
          if(this.GLOBAL.userId == '' ){
              alert("Please Sign In");
              this.$router.push({
                path: '/Login',
                replace: true
              });
          }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-header{
  display: inline-flex;
}
h3{
    font-weight:800;
}
p{
    font-size:16px;
}
.cup{
    width: 100px;
    margin-left:-6%;
    margin-top:18%;
}
#add{
    position:absolute;
    left:8%;
    background-color:white;
    border:none;
    outline: none;
}
#add img{
    position:absolute;
    left:0;
    top:0;
}
#intro{
    width:294px;
    height:60px;
    margin-left:12.5%;
    margin-top:16%;
    text-align:left;
    color:#6D6B6B;
    font-size:15px;
    margin-bottom:4%;
}
/* template{
    background-color:green;
} */
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

.footer{
  position:fixed;
  bottom: 0;
}

.footer-button{
  display: inline-block;
  justify-content: space-around;
}
</style>
