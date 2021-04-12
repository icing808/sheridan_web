<template>
    <div class="SignUp">
        <h1>Sign Up</h1>
        <div>{{msg}}</div>
        <div>
            Name：
            <input type="text" v-model="name">
        </div>
        <div>
            Email：
            <input type="text" v-model="email">
        </div>
        <div>
            Password：
            <input type="text" v-model="password">
        </div>
        <button @click="register">Sign Up</button>

        <p><router-link to="/Login">Sign In</router-link></p>
        <p><router-link to="/">Home</router-link></p>
    </div>
</template>
<script>
export default {
    name: "SignUp",
    data(){
        return{
            msg: '',
            name: '',
            email: '',
            password: '',
            nameId: "",
            showID: false,
            array: [],
            showAll: false
        }
    },
    methods:{
        register(){
            this.showAll = false
            this.showID = false
            let params = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$http.post('/api/user/register',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   //alert(res.data.message)
                   this.msg = res.data.message + " Please Sign In"
                   this.$router.push({
                       path: '/Login',
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