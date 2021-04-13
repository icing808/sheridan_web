<template>
    <div>
        <div>{{msg}}</div>
            <div>
                Title:
                <input type="text" v-model="title">
            </div>
            <div>
                Content:
                <input type="text" v-model="content">
            </div>
            <div>
                Start Time:
                <input type="text" v-model="startTime">
            </div>
            <div>
                End Time:
                <input type="text" v-model="endTime">
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
            <button @click="addTask">Add</button>

            <p><router-link to="/TaskList">Back</router-link></p>
    </div>
</template>

<script>
export default {
    name: "AddTask2",
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
            showAll: false
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
        }
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
