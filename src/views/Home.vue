<template>
  <div>
    <NavBar />
    <v-container fluid>
      <h1>Información COVID Chile</h1>
     

      <v-responsive>
       
       <v-row class="mx-auto">
          <v-col cols="12" xs="12" sm="12" md="12" xl="12">
            <Vacunados/>
          </v-col>
        </v-row>

    

        <v-row class="mx-auto">
          <v-col cols="12" xs="12" sm="12" md="3" xl="3">
            <InfoDiaria />
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="6" xl="6">
            <Grafico />
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" xl="3">
            <Comunas10 />
          </v-col>
        </v-row>
            <v-row class="mx-auto">
          <v-col cols="12" xs="12" sm="12" md="12" xl="12">
                       <MiniGrafico />

          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
import Comunas10 from "../components/Comunas10.vue";
import Grafico from "../components/Grafico.vue";
import NavBar from "../components/NavBar.vue";
import InfoDiaria from "../components/InfoDiaria";
import MiniGrafico from "../components/miniGrafico.vue";
import CamaUCI from "../components/CamaUCI";
import GraficoMain from "../components/GraficoMain.vue";
import Vacunados from "../components/DosisPorVacuna.vue";
import Exportador from "../components/exportador.vue";

export default {
  components: {
    Grafico,
    Comunas10,
    InfoDiaria,
    NavBar,
    GraficoMain,
    CamaUCI,
    MiniGrafico,
    Exportador,
    Vacunados,
  },
  data() {
    return {
      theme: "",
      mensaje: "",
    };
  },
  watch: {
    theme: localStorage.getItem("theme"),
  },
};
</script>
<style>

</style>
