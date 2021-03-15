<template>
  <div id="app">
    <bar-chart></bar-chart>
    <line-chart></line-chart>
  </div>
</template>

<script>
import Barchart from "./charts/Bar.vue";
import Linechart from "./charts/LinePSI.vue";
export default {
  components: { "bar-chart": Barchart, 
  "line-chart": Linechart 
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 20;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>