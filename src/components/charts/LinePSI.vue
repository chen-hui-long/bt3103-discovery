<template>
    <div class = "chart">
        <h1>Line Chart</h1>
        <line-chart></line-chart>
    </div>
</template>

<script>
import Linechart from "./Linechart.js"
export default {
    components:{
        "line-chart": Linechart
    }
}
</script>
