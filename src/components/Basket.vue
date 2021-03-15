<template>
<div>
    <ul>
        Menu:
        <li v-for = 'item in itemsSelected' v-bind:key='item[0]'> 
            {{item[0]}} x {{item[1]}} 
            </li>
    </ul>
    <div id = "total">
    <p v-show = flag> Subtotal: ${{this.total}} </p>
    <p id = "finaltotal" v-show = flag> Grand Total: ${{this.findTotalGST}} </p>
    <button v-on:click= "sendOrder">Add Order</button>
    </div>
    </div>    
</template>

<script>
import database from "../firebase"

export default {
    props: {
        itemsSelected: {
        }
    }, 
    computed: {
        findTotalGST() {
            return (this.total * 1.07).toFixed(2);
        }
    }, 
    data() {
        return {
        total: 0,
        flag: false,
        }
    }, 
    methods: {
        
        findTotal: function() {
            this.total = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.total += this.itemsSelected[i][2] * this.itemsSelected[i][1]
            }
            this.flag = true;
        }, 

        sendOrder: function() {
            var orders = {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun":0,
                "Sambal KangKung":0, 
                "Pork Fried Rice":0, 
                "Mapo Tofu":0, 
                "Cereal Prawn":0, 
            }

            /*
            var orders = {}

            database.collection("menu").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    orders[doc.data().name]= 0
                })
            })
            */
            console.log(orders)
            
            for (var item of this.itemsSelected) {
                var itemName = item[0]
                var itemQty = item[1]
                
                orders[itemName] =  itemQty;
            }
            database.collection("orders").add({
                orders
            }).then(() => {location.reload()})
            
        }
    }, 
    watch: {
        itemsSelected: function(){
            this.total = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.total += this.itemsSelected[i][2] * this.itemsSelected[i][1]
            }
            if (this.total == 0) {
                this.flag = false;
            } else {
                this.flag = true;
            }
            return this.total;
        }
    }

}
</script>

<style scoped>
    ul {
        font-size: 25px;
    }

    button{
        height: 50px;
        border-radius: 8px;
    }

    #total {
        font-size: 25px;
        margin: 20px;
    }
    
    button {
        font-size: 25px
    }

    #finaltotal {
        color:blue;
        text-decoration: underline;
    }
</style>