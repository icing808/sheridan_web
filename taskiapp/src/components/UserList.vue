<template>
    <div>
        <h1>All User Information</h1>
        <div>{{msg}}</div>

        <div v-show="showAll">
            <p v-for="item in array" :key="item._id">
                {{item.name}}'s ID: {{item._id}} and Email: {{item.email}}
                <button @click="deleteone(item.name)">Delete Account</button>
            </p>
        </div>
        
        <!-- <button @click="getAll">Get All User</button> -->

        <p><router-link to="/">Home</router-link></p>
    </div>
</template>
<script>
export default {
    name: "UserList",
    data(){
        this.$http.get('/api/user/all').then((res) => {
                console.log(res)
                if(res.data.length>0){
                    this.showAll = true
                    this.array = res.data
                }else{
                    //alert("No this user！")
                    this.msg = "No this user！"
                }
            }).catch((err) => {
                console.log(err)
            })
        return{
            msg: '',
            name: '',
            array: [],
            showAll: false
        }
    },
    methods:{
        // getAll(){
        //     this.$http.get('/api/user/all').then((res) => {
        //         console.log(res)
        //         if(res.data.length>0){
        //             this.showAll = true
        //             this.array = res.data
        //         }else{
        //             //alert("No this user！")
        //             this.msg = "No this user！"
        //         }
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
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