<template>
  <div class=" col-md-12">
   <NavBar/>
    <v-card>
      <v-row>
        
        <v-col cols="2"> 
            <DatosDiarios/>
        </v-col>
       
        <v-col cols="6">
          <Grafico />
        </v-col>
       
        <v-col cols="4">
          <Comunas10/>
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
    DatosDiarios
  },
  props: {},
};
</script>
<style>


@media (prefers-color-scheme: dark) {
  body {
    --color-bg: rgb(53, 53, 53);
    --color-text: wheat;
  }

  body.light-theme {
    --color-bg: #dddddd;
    --color-text: #ee6352;
  }
}

body {
  background-color: var(--color-bg);
}

h1 {
  color: var(--color-text);
}

</style>
