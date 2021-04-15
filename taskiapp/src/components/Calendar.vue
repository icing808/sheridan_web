<template>
  <div>
    <b-calendar block
      id="ex-disabled-readonly"
      hidden: true 
    ></b-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calender',
  data () {
    return {
      state: 'normal'
    }
  }
}
</script>

<style scoped>

</style>
