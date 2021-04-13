<template>
    <div class="SignUp">
        <b-button variant="outline-primary" @click="$router.go(-1)">            
            <img src="../assets/back.png">
        </b-button>
        <h1>Hi~</h1>
        <h3>Create a New Account :D</h3>
        <div>
            <img src="../assets/sign-up.png">
        </div>
        <div>
            <div>
                <input type="text" placeholder="Name" v-model="name">
            </div>
            <div>
                <input type="text" placeholder="Email" v-model="email">
            </div>
            <div>
                <input type="text" placeholder="Password" v-model="password">
            </div>
        </div>
        <div>
            <b-button @click="register">
                Sign Up
            </b-button>
        </div>
        <div>
            <b-button>
                <router-link to="/Login">
                    Login
                </router-link>
            </b-button>
        </div>

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