<template>
  <v-app>
    <div id="app" 
>
      <Home />
      </div>
  </v-app>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  name: "App",
  components: {
    Home,
  },
  data(){
    return{

    }
  }
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  padding: 0;
  margin-left: 0px;
  margin-right: 0px;
}

</style>
