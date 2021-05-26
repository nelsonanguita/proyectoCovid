<template>
  <div  >
    <NavBar />
    <v-card>
      <v-row>
        <v-col xs="12" sm="12" md="2" xl="3">
        </v-col>

        <v-col xs="12" sm="12" md="8" xl="6">
          <Grafico />
        </v-col>

        <v-col xs="12" sm="12" md="2" xl="3">
          <Comunas10 />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Comunas10 from "../components/Comunas10.vue";
import Grafico from "../components/Grafico.vue";
//import ModoOscuro from "../components/ModoOscuro.vue";
import NavBar from "../components/NavBar.vue";
import DatosDiarios from "../components/DatosDiarios.vue";

export default {
  components: {
    Grafico,
    Comunas10,
    //ModoOscuro,
    NavBar,
    DatosDiarios,
  },
  data() {
    return {
      theme: "",
    };
  },
  watch: {
    theme: localStorage.getItem("theme"),
  },
};
</script>
<style></style>
