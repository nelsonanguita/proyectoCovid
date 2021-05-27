<template>
  <v-app-bar id="encabezado" app clipped-left height="50">
    <v-switch
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      @change="cambio"
      inset
      :label="`Modo  ${!oscuro ? 'Oscuro' : 'Claro'}`"
    ></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      oscuro: false,
      theme: "",
    };
  },
  methods: {
    cambio() {
      this.oscuro = this.oscuro = !this.oscuro;

      const prefresDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      if (prefresDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        this.theme = document.body.classList.contains("light-theme")
          ? "light"
          : "dark";
        localStorage.setItem("theme--dark", true);
      } else {
        document.body.classList.toggle("dark-theme");
        this.theme = document.body.classList.contains("dark-theme")
          ? "dark"
          : "light";
        localStorage.setItem("theme--dark", false);
      }
      document.body.classList.remove(this.theme);
    },
  },
  created() {
    this.cambio();
  },
  watch: {},
};
</script>

<style></style>
