<template>
    <div class="SignUp">
        <b-button variant="outline-primary" @click="$router.go(-1)">
            <img id="back" src="../assets/back.png">
        </b-button>
        <h2>Hi~</h2>
        <h5>Create a New Account :D</h5>
        <div>
            <img class="cup" src="../assets/sign-up.png">
        </div>
        <div>
            <div class="input name">
                <input type="text" placeholder="Name" v-model="name">
            </div>
            <div class="input">
                <input type="text" placeholder="Email" v-model="email">
            </div>
            <div class="input psd">
                <input type="text" placeholder="Password" v-model="password">
            </div>
        </div>
        <div>
            <b-button @click="register" class="btn log">
                SIGN UP
            </b-button>
        </div>
        <div>
            <b-button class="btn snup">
                <router-link to="/Login" >
                    <p id="p1">LOGIN</p>
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
<style scoped>
h2,h5{
    text-align:left;
    margin-left:16%;
    font-weight:bold;
}
#back{
    position:absolute;
    left:10%;
    top:6%;
}

.btn{
    width: 280px;
    height: 40px;
    border:none;
}
.log{
    background:linear-gradient(to right, #04B4EE,#1ED9D3);
    color:white;
    margin-top:8%;
    margin-bottom:4%;
}
.snup{
    border:2px solid transparent;
    border-image:linear-gradient(to right, #04B4EE,#1ED9D3);
    border-image-slice:1;
    background-color:white;
    border-radius:8px;
    margin-top:4%;
}
.cup{
    width: 100px;
    margin-left:-4%;
    margin-top:4%
}
.name{
    margin-top: 5%
}
.psd{
    margin-top: 2%;
    margin-bottom: 6%
}
.input{
    margin:6%
}
.input input{
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    width:280px;
}
#p1{
    color:black
}


</style>
