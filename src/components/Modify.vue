<template>
    <ul>
    <p v-for="(food, foodIndex) of Object.entries(this.datapacket[0].orders)" v-bind:key="foodIndex">
        {{food[0]}}: {{food[1]}}
        <br>
        <input type="text" placeholder= 0 min= 0>   
    </p>
    <button v-on:click ="updateOrder">Update</button>
   </ul>
    
</template>

<script>
import database from "../firebase.js";
export default {
    data() {
        return {
            docID:"",
            datapacket:[],
            allInputs: [], 
            inputValue: [], 
            idx: 0,
        }
    },

    methods: {
        fetchItems:function() {
            database.collection('orders').doc(this.docID).get().then((snapshot) => {
                this.datapacket.push(snapshot.data())
            })
            console.log(this.datapacket)
        }, 

        updateOrder:function() {
            this.retrieveInput();
            console.log(this.inputValue)
            let copy = JSON.parse(JSON.stringify(this.datapacket)) //deep copy
            var arr = copy[0].orders
            this.idx = 0;
            for (const [key, value] of Object.entries(arr)) {
                console.log(key)
                console.log(value)
                if (this.inputValue[this.idx] === "") {
                    this.idx++
                    //console.log(this.idx)
                    continue;
                } else {
                    database.collection("orders").doc(this.docID).update({
                        [`orders.${key}`]: parseInt(this.inputValue[this.idx])
                        
                    })//.then(() => location.reload())
                    this.idx++
                }
                //console.log(this.idx)
            }
            
            setTimeout(this.push, 200)

        }, 

        retrieveInput:function() {
            this.allInputs = document.getElementsByTagName('input')
            for (var arr of this.allInputs) {
                this.inputValue.push(arr.value)
            }
        }, 

        push:function() {
            this.$router.push({path:"/orders"})
        }
    }, 


    created() {
        this.docID = this.$route.query.id
        this.fetchItems();
    }
}
</script>

<style scoped>

</style>