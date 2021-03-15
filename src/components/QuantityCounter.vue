<template>
    <div>
        <button v-on:click = "increase">+</button>
        {{counterValue}}
        <button v-on:click = "decrease">-</button>
        </div>
</template>

<script>
export default {
    data() {
        return {
            counterValue: 0
        }
    }, 
    methods:{
        increase() {
            if (this.counterValue == 10) {
                alert("You cannot buy more than 10 items.")
            }
            if (this.counterValue >= 0 && this.counterValue <= 9) {
                this.counterValue++;
            }  
            this.$emit('counter', this.items, this.counterValue)
        },
        decrease() {
            if (this.counterValue > 0) {
                this.counterValue--;
            }
            this.$emit('counter', this.items, this.counterValue)
        }
    }, 
    props: {
        items :{
        }
    },
    
}
</script>

<style scoped>
    button{
        background-color:hotpink;
        border: none;
        text-align: center;
        width: 50px;
        height: 50px;
        margin: 5px;
        font-size: 100%;
        border-radius: 8px;
    }

</style>