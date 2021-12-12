<template >
  <v-app-bar class="pa-2 align-center"   app clipped-left height="50">
    <span class="pa-2 align-center" >
      <v-card-actions class="px-0 pb-0">  
         <v-switch
        fluid
        align-center
        :dark="setTheme"
        @change="cambio"
        inset
        :label="`Modo  ${!oscuro ? 'Oscuro' : 'Claro'}`"
      ></v-switch>
      </v-card-actions>
     
    </span>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      oscuro: false,
      theme: "",
      leyenda: "",
    };
  },
  methods: {
    cambio() {
      this.oscuro = this.oscuro = !this.oscuro;
      localStorage.setItem("theme", this.oscuro ? "dark" : "light");
    },
    compruebaTheme() {
      const prefresDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      let theme;

      if (prefresDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        theme = document.body.classList.contains("light-theme")
          ? "light"
          : "dark";
      } else {
        document.body.classList.toggle("dark-theme");
        theme = document.body.classList.contains("dark-theme")
          ? "dark"
          : "light";
      }
      localStorage.setItem("theme", theme);
    },
    verificaLocal() {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "dark") {
        document.body.classList.toggle("dark-theme");
        this.oscuro = true;

      } else if (currentTheme === "light") {
        document.body.classList.toggle("light-theme");
        this.oscuro = false;
      } else {
        this.compruebaTheme();
      }
    },
  },
  created() {
    this.verificaLocal();
  },
  computed: {
    setTheme() {
      //console.log(this.oscuro)
      if (this.oscuro === true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    },
  },
  watch: {},
};
</script>

<style></style>
