<template>
    <div class="login">
        <b-button variant="outline-primary">
            <router-link to="/">
                <img src="../assets/back.png">
            </router-link>
        </b-button>
        <h1>Welcome back</h1>
        <h2>Please log in :)</h2>

        <img src="../assets/login-pic.png">
        <div>
            <input type="text" placeholder="Email" v-model="email">
        </div>
        <div>
            <input type="text" placeholder="Password" v-model="password">
        </div>
        <div>
            <b-button @click="login">
                Sign In
            </b-button>
        </div>
        <div>
            <a>Forget Password?</a>
        </div>
        <div>
            <b-button variant="outline-primary" v-show="showSignUp">
                <router-link to="/SignUp">
                    CREATE ACCOUNT
                </router-link> 
            </b-button>
        </div>
        
        <!-- CHECK -->
        <div v-show="showID">
            <p>Hello, {{name}}</p>
            <p>UserId：{{nameId}}</p>
        </div>

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


</style>