<template>
      <v-app-bar id="encabezado" app clipped-left height="50" >
        <v-switch
          :class="theme"
          @click="$vuetify.theme.dark = ! $vuetify.theme.dark"
          inset
          :label="`Modo  ${!oscuro ? 'Oscuro' : 'Claro'}`"
          @change="cambio"
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
      } else {
        document.body.classList.toggle("dark-theme");
        this.theme = document.body.classList.contains("dark-theme")
          ? "dark"
          : "light";
      }
      localStorage.setItem("theme", this.theme);
        //document.body.theme='theme---'+this.theme
        console.log(document.body.encabezado)
        document.body.encabezado.theme='theme---'+this.theme
        console.log(document.body)
    },
  },
  watch: {

  },
};
</script>

<style></style>
