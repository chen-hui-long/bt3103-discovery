<template>
    <div class = "chart">
        <h1>Bar Chart</h1>
        <bar-chart></bar-chart>
    </div>
</template>

<script>
import Barchart from "./Barchart.js"
export default {
    components:{
        "bar-chart": Barchart
    }
}
</script>
