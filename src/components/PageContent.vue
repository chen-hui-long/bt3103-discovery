<template>
  <div>
      <ul>
          <li v-for = "item in items" v-bind:key="item.name">
              <h2>{{item.name}}</h2>
              <img v-bind:src ="item.imageURL">
              <p id= "item-price">${{item.price}}</p>
              <qty-counter v-bind:items = "item" v-on:counter ="onCounter"></qty-counter>
          </li>
      </ul>
      <basket v-bind:itemsSelected = "itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter"
import Basket from "./Basket"
import database from "../firebase.js"

export default {

  components: {
      "qty-counter":QuantityCounter,
      "basket": Basket
  }, 
  data() {
      return {
          items: [],
          itemsSelected: [], 
      }
  }, 
  methods :{
      onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in itemsSelected selected, push the ORDER in
        //this.itemsSelected.push([item.name, count, item.price]);
        var currItem = [item.name, count, item.price];
        this.$set(this.itemsSelected, 0, currItem)
        console.log("1")
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
            if (item.name == item_name && curr_item[1] > 0) {
                //this.itemsSelected[i][1] = count
                this.$set(this.itemsSelected[i], 1, count)
                console.log("2")
            }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
            if (item.name == item_name && curr_item[1] == 0) {
                //this.$delete(this.itemsSelected, i)
                this.itemsSelected.splice(i, 1)
                console.log("3")
                break
            } else if (item.name == item_name) {
                break
            }
          // otherwise, if the item is not in itemsSelectedelected, add it to itemsSelected by pushing the ORDER in.
            if (item.name != item_name && (i+1) == this.itemsSelected.length && count != 0) {
                // at the end of the list 
                //var currItem = [item.name, count, item.price]
                //this.$set(this.itemsSelected, this.itemsSelected.length, currItem)
                this.itemsSelected.push([item.name, count, item.price])
                console.log("4")
                break
            }
        }
      }
      console.log("onCounter function call")
      console.log(this.itemsSelected)
    },

    fetchItems: function() {
      database.collection("menu").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.items.push(doc.data());
          //console.log(doc.data());
        })
      })
    }
  }, 

  created() {
    this.fetchItems();
    console.log(this.items);
  }
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

#item-price {
    font-size:25px;
}

</style>