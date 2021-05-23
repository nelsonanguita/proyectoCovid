<template>
  <v-container>
    <v-app-bar app clipped-left height="50">
      <v-switch
        @click="cambioo"
        inset
        persistent-hint
        :label="`Modo oscuro: ${oscuro.toString()}`"
      ></v-switch>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
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
