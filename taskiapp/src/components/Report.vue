<template>
  <div>
    <div>
      <b-button variant="outline-primary" @click="$router.go(-1)">
            <img id="back" src="../assets/back.png">
      </b-button>
    </div>
    <h5>Hi, {{ this.GLOBAL.userName }}, Your Taski Report: </h5>
    <div class="col-md-12">
    <div id="taskReportDiv" style="width: 600px;height: 400px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Report',
  data () {
    return {
      msg: '',
      title: '',
      content: '',
      startTime: '',
      endTime: '',
      categoryId: '',
      level: '',
      array: [],
      showAll: false,
      show: false,
      charts: '',   
    }
  },
  methods: {
    drawPie(id, opinionData){
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
          tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          padding: [20, 20, 20, 50],
          data:this.opinion
        },
        series: [
          {
            name:'Task Count(%)',
            type:'pie',
            radius:['50%','70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: opinionData
          }
        ]
      })
    }
  },
  created() {
    console.log('init Method:'+this.GLOBAL.userId);
    if(this.GLOBAL.userId == '' ){
      alert("Please Sign In");
      this.$router.push({
        path: '/Login',
        replace: true
      });
    }
  },
  mounted() {
    let opinionData = [];
    //get pie chart data
    this.$http.post('/api/task/getTaskiData', {userId: this.GLOBAL.userId}).then((res) => {
      if(res.data.status == 1000){
        opinionData = res.data.data
        this.$nextTick(function() {
          this.drawPie('taskReportDiv', opinionData)
        })
      }
    }).catch((err)=>{
        console.log(err)
    });
    
  }
}
</script>

<style scoped>
#back{
    position:absolute;
    left:12%;
    top:6%;
}
</style>