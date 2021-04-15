<template>
  <div>
    <div>
      <b-button @click="$router.go(-1)">Back</b-button>
    </div>
    <h5>Hi, {{ this.GLOBAL.userName }}, Your Taski Report: </h5>
    <div id="taskReportDiv" style="width: 600px;height: 400px;"></div>
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
                  fontWeight: 'blod'
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

</style>