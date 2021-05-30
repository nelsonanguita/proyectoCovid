<template>
  <div  >
    <NavBar />
<v-container  fluid>
  <v-responsive >  
        <h1>Información COVID Chile</h1>

  <v-row  class="mx-auto ">
       <v-col cols="12"  xs="12" sm="12" md="3" xl="3">
          <InfoDiaria />
       </v-col>


      <v-col cols="12" xs="12" sm="12" md="6" xl="6">
          <Grafico />
      </v-col>


        <v-col cols="12" xs="12" sm="12" md="3" xl="3">
          <Comunas10 />
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


export default {
  components: {
    Grafico,
    Comunas10,
    InfoDiaria,
    NavBar,
    
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
