<template>
  <ul>
    <li v-for="(order, orderIndex) in orders" v-bind:key="orderIndex">
        <ul v-for ="(o, oIndex) in Object.entries(order[1].orders)" :key="oIndex">
            {{o[0]}}: {{o[1]}}
            </ul>
            <button v-bind:id = "order[0]" v-on:click = "deleteItem($event)">Delete</button>
            <button v-bind:id = "order[0]" v-on:click = "route">Modify</button>
    </li>
  </ul>
</template>

<script>
import database from "../firebase.js";
export default {
    components: {
    }, 
  data() {
    return {
        orders: [],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },

    deleteItem:function(event) {
        let doc_id = event.target.getAttribute("id");
        database.collection('orders').doc(doc_id).delete().then(() => location.reload())
    },
    route:function(event) {
        let doc_id = event.target.getAttribute("id");
        this.$router.push({path: "/modify", query: {id: doc_id}})
    }
  },

  created() {
    this.fetchItems();
    console.log(this.orders)
    //console.log(this.orders[1].orders)
  },
};
</script>


<style scoped>
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>