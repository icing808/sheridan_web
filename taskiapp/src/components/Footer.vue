<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <el-row class="bottom-nav">
      <router-link
        v-for="(i,index) in list"
        :key="index"
        @click="addClassName(i.path)"
        :to="i.path">
        <el-col :span="8">
          <div><img :src="i.path===$route.path?list[index].active : list[index].img"></div>
          <div class="grid-content">{{i.name}}</div>
        </el-col>
      </router-link>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "TaskList",
        props:['tabName'],
        data() {
            return {
                num:true,
               list:[

                   {
                       img: require("../assets/TaskList-normal.png"),  
                       active: require("../assets/TaskList-selected.png"), 
                       name: "TaskList",
                       path: "/TaskList"
                   },
                   {
                       img: require("../assets/calendar-normal.png"),
                       active: require("../assets/calendar-selected.png"),
                       name: "Calender",
                       path: "/TaskList"
                   },
                   {
                       img: require("../assets/user-normal.png"),
                       active: require("../assets/user-selected.png"),
                       name: "User",
                       path: "/UserList"
                   }

               ],


            }
        },

        methods: {
            addClassName: function(path) {
                this.$router.replace(path);
            },
        }
    }
</script>

<style lang="less" scoped>
  .grid-content {
    min-height: 2rem;
    /*line-height:4.5rem;*/
    color: rgb(84,62,62);
    font-size: 1rem;
  }
  .bottom-nav {
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    box-shadow: 0 1px 1rem rgb(230,230,230);
    img {
      width: 2.1rem;
      margin-top: 2px;
    }
  }
</style>