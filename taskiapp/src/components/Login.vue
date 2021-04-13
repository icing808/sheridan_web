<template>
    <div class="login">
        <b-button variant="outline-primary">
            <router-link to="/">
                <img id="back" src="../assets/back.png">
            </router-link>
        </b-button>
        <h2>Welcome back</h2>
        <h5>Please log in :)</h5>

        <img src="../assets/login-pic.png" id="img" class="cup">
        <div id="email">
            <input type="text" placeholder="Email" v-model="email" >
        </div>
        <div id="psd">
            <input type="text" placeholder="Password" v-model="password">
        </div>
        <div>
            <b-button @click="login" class="btn log">
                LOGIN
            </b-button>
        </div>
        <div>
            <a>Forget Password?</a>
        </div>
        <div>
            <b-button variant="outline-primary" v-show="showSignUp" class="btn snup">
                <router-link to="/SignUp">
                    <p id="">CREATE ACCOUNT</p>
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
                   this.GLOBAL.userId = res.data.data[0]._id;
                   this.GLOBAL.userName = res.data.data[0].name;
                   this.GLOBAL.userEmail = res.data.data[0].email;
                   this.$router.push({
                       path: '/Home',
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
h2{
    font-size:36px;
    font-weight:800;
    
}
h5{
    font-size:24px;
}
h2,h5{
    text-align:left;
    margin-left:40%;
    color:#1B052F;
}
p{
    color:#2E0E4C;
}
#back{
    position:absolute;
    left:38%;
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
    margin-top:-2%;
    margin-bottom:1%;
    
}
.snup{
    border:2px solid transparent;
    border-image:linear-gradient(to right, #04B4EE,#1ED9D3);
    border-image-slice:1;
    background-color:white;
    border-radius:8px;
    margin-top:1%;
}
.cup{
    width: 100px
}
#email{
    margin-top: 5%
}
#psd{
    margin-top: 2%;
    margin-bottom: 6%
}
#email input{
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    width:280px;
}
#psd input{
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    width:280px;
}

</style>
