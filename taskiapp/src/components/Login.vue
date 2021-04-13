<template>
    <div class="login">
        <h1>Sign In</h1>
        <div>{{msg}}</div>
        <div>
            Email：
            <input type="text" v-model="email">
        </div>
        <div>
            Password：
            <input type="text" v-model="password">
        </div>
        <button @click="login">Sign In</button>

        <div v-show="showID">
            <p>Hello, {{name}}</p>
            <p>UserId：{{nameId}}</p>
        </div>

         <p v-show="showSignUp"><router-link to="/SignUp">Sign Up</router-link></p>
        <p><router-link to="/">Home</router-link></p>
    </div>
</template>
<script>
export default {
    name: "login",
    data(){
        return{
            msg: '',
            name: '',
            email: '',
            password: '',
            nameId: "",
            showID: false,
            array: [],
            showAll: false,
            showSignUp: true
        }
    },
    methods:{
        login(){
            this.showAll = false
            this.showID = false
            let params = {
                email: this.email,
                password: this.password
            }
            this.$http.post('/api/user/login',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   this.showID = true
                   this.nameId = res.data.data[0]._id
                   this.name = res.data.data[0].name
                   this.showSignUp = false;
                   this.GLOBAL.userId = res.data.data[0]._id;
                   this.GLOBAL.userName = res.data.data[0].name;
                   this.GLOBAL.userEmail = res.data.data[0].email;
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