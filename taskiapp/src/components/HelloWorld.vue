<template>
  <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
    <div class="hello">
      <div class="hello-header">
        <b-button ref="show" :disabled="show" @click="show = true">
          <img src="../assets/tasks-add-task.png">
        </b-button>
        <h1>Tasks</h1>
      </div>

      <div>
        <img src="../assets/tasks-empty-pic.png">
      </div>

      <div>
        <p>Press "+" to create a new task, they'll show up here in chronological order.</p>
      </div>

      <!-- TODO: Add statement when have tasks -->

      <!-- <h1>{{ msg }}</h1>
      <h1>Hi, {{ this.GLOBAL.userName }}</h1> -->
    </div>
    <template #overlay>
      <div>
          <h2>New Task</h2>
          <b-button ref="cancel" aria-describedby="cancel-label" @click="show = false">Cancel</b-button>
          <b-button @click="addTask">Done</b-button>
      </div>
      <div>
          <div>
              <input type="text" v-model="title" placeholder="Title">
          </div>
          <div>
              <div>Description</div>
              <input type="text" v-model="content" placeholder="Content">
          </div>
          <div>
              <div>Start Date</div>
              <input type="text" v-model="startTime" placeholder="Start Time">
          </div>
          <div>
              <div>End Date</div>
              <input type="text" v-model="endTime" placeholder="End Time">
          </div>

          <div class="barrage-size">
              Category:
              <input type="radio" value="1" v-model="categoryId"> <span id="s-size">Study</span>
              <input type="radio" value="2" v-model="categoryId"> <span id="m-size">Work</span>
              <input type="radio" value="3" v-model="categoryId"> <span id="l-size">Other</span>
          </div>
          <div>
              Level:
              <input type="radio" value="1" v-model="level"> <span id="s-size">General</span>
              <input type="radio" value="2" v-model="level"> <span id="m-size">Important</span>
              <input type="radio" value="3" v-model="level"> <span id="l-size">Emergent</span>
          </div>

      </div>
      <!-- <div class="text-center">
      <b-button
          ref="cancel"
          variant="outline-danger"
          size="sm"
          aria-describedby="cancel-label"
          @click="show = false"
      >
          Cancel
      </b-button>
      </div> -->
    </template>
  </b-overlay>
</template>



<script>
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
            show: false
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-header{
  display: inline-flex;
}

/* h1, h2 {
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
} */
</style>
