<template>
    <div class="SignUp">
        <b-button variant="outline-primary" @click="$router.go(-1)">
            <img id="back" src="../assets/back.png">
        </b-button>
        <h2>Hi~</h2>
        <h5>Create a New Account :D</h5>
        <div>
            <img class="cup" src="../assets/sign-up.png">
            <h6>{{msg}}</h6>
        </div>
        <div>
            <div class="input name">
                <input type="text" placeholder="Name" v-model="name">
            </div>
            <div class="input">
                <input type="email" placeholder="Email" v-model="email">
            </div>
            <div class="input psd">
                <input type="password" placeholder="Password" v-model="password">
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

            const regEmail = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
            const regPw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (this.name == '' || this.name == undefined || this.name == null
                || this.email == '' || this.email == undefined || this.email == null
                || this.password == '' || this.password == undefined || this.password == null ) {
                this.msg = "The input box cannot be empty ";
                return;
            } else {
                if (!regEmail.test(this.email)) {
                    this.msg = "Please input the correct format in the input box ";
                    return;
                }
                if (!regPw.test(this.password)) {
                    this.msg = "The password must includes Numbers and Letters, and should contain both Numbers and Letters, and the length should be between 8-16 bits ";
                    return;
                }
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
h2{
    font-size:36px;
    font-weight:800;

}
h5{
    font-size:24px;
}
h6{
    font-size:16px;
    color: red;
}
h2,h5{
    text-align:left;
    margin-left:14%;
    color:#1B052F;
}
#back{
    position:absolute;
    left:12%;
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
    margin-bottom:2%;
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
    margin-top: 2%
}
.psd{
    margin-top: 2%;
    margin-bottom: 2%
}
.input{
    margin-top:8%
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
