<template>
  <div id="app">
    <h1>NO.1 ZI CHAR SGG</h1>
    <div id = "nav">
      <router-link to ="/" exact id = "home">Home</router-link>
      <router-link to ="/orders" exact id ="Orders">Orders</router-link>
      <router-link to ="/dashboard" exact id ="dashboard">Dashboard</router-link>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
  }, 
  data() {
    return {

    }
  }

}
</script>

<style>
  h1{
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:cornflowerblue;
  }

  #home{
    border-style: solid;
    width:20%;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin:10px;
  }

  #Orders{
    border-style: solid;
    width:20%;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin:10px;
  }

  #dashboard{
    border-style: solid;
    width:20%;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin:10px;


  }

</style>
