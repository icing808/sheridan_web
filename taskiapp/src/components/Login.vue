<template>
    <div class="login">
        {{msg}}
        <div>
            Username：
            <input type="text" v-model="name">
        </div>
        <div>
            Password：
            <input type="text" v-model="password">
        </div>
        <button @click="login">Sign In</button>
        <button @click="register">Sign Up</button>
        <button @click="getAll">Get All User</button>
        <div v-show="showID">
            <p>UserId：{{nameId}}</p>
        </div>
        <div v-show="showAll">
            <p v-for="item in array" :key="item._id">{{item.name}}'s ID: {{item._id}} <button @click="deleteone(item.name)">Delete Account</button></p>
        </div>
        <p><router-link to="/">Home</router-link></p>
    </div>
</template>
<script>
export default {
    name: "login",
    data(){
        return{
            msg: "SignIn or SignUp",
            name: '',
            password: '',
            nameId: "",
            showID: false,
            array: [],
            showAll: false
        }
    },
    methods:{
        login(){
            this.showAll = false
            this.showID = false
            let params = {
                name: this.name,
                password: this.password
            }
            this.$http.post('/api/user/login',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   this.showID = true
                   this.nameId = res.data.data[0]._id
                }else{
                    alert(res.data.message)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        register(){
            this.showAll = false
            this.showID = false
            let params = {
                name: this.name,
                password: this.password
            }
            this.$http.post('/api/user/register',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   alert(res.data.message)
                }else{
                    alert(res.data.message)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getAll(){
            this.$http.get('/api/user/all').then((res) => {
                console.log(res)
                if(res.data.length>0){
                    this.showAll = true
                    this.array = res.data
                }else{
                    alert("No this user！")
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        deleteone(names){
            let params = {
                name: names
            }
            this.$http.post('/api/user/delete',params).then((res) => {
                console.log(res)
                this.array = res.data.data
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>