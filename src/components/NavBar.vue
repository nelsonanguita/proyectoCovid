<template>
  <v-container>
    <v-app-bar app clipped-left height="50">
-
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  
  data() {
    return {
      oscuro: false,
    };
  },
  methods: {
    cambioo() {
      this.oscuro = this.oscuro = !this.oscuro;
      console.log(this.oscuro);
    },
  },
  watch: {},
};
</script>

<style></style>
