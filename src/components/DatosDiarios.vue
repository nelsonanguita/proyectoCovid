<template>
  <v-app>
    <v-card
      elevation="24"
      hover
      max-width="250"
      class="mx-auto pa-2 transition-swing"
    >
   
     <vue-ellipse-progress
        :data="datos"
        :progress="progreso"
        :angle="-90"
        color="blue"
        :colorFill="transparent"
        emptyColor="#8ec5fc"
        :emptyColorFill="transparent"
        :size="150"
        :thickness="5"
        emptyThickness="9%"
        lineMode="in 1"
        :legend="true"
        :legendValue="1"
        :legendFormatter="
          ({ currentValue }) =>
            new Intl.NumberFormat('de-DE').format(currentValue)
        "
        legendClass="legend-custom-style"
        dash="60 0.9"
        animation="reverse 700 400"
        :noData="false"
        :loading="false"
        fontColor="white"
        :half="false"
        :gap="10"
        dot="20 blue"
        reverse
        fontSize="1rem"
        legend-value="progreso"
      >
        <p slot="legend-caption">GOOD JOB</p>
        
      </vue-ellipse-progress>

     <vue-ellipse-progress
        :data="datos"
        :progress="progreso"
        :angle="-90"
        color="blue"
        :colorFill="transparent"
        emptyColor="#8ec5fc"
        :emptyColorFill="transparent"
        :size="150"
        :thickness="5"
        emptyThickness="9%"
        lineMode="in 7"
        :legend="true"
        :legendValue="1"
        :legendFormatter="
          ({ currentValue }) =>
            new Intl.NumberFormat('de-DE').format(currentValue)
        "
        legendClass="legend-custom-style"
        dash="60 0.9"
        animation="reverse 700 400"
        :noData="false"
        :loading="false"
        fontColor="white"
        :half="false"
        :gap="10"
        dot="10 green"
        reverse
        fontSize="1rem"
        legend-value="progreso"
      >
                
        <template v-slot:legend-value>
          <span slot="legend-value">/{{progreso}}</span>
        </template>
        <template v-slot:legend-caption>
          <p slot="legend-caption">{{progreso}}</p>
        </template>
      </vue-ellipse-progress>


     <vue-ellipse-progress
        :data="datos"
        :progress="progreso"
        :angle="-90"
        color="blue"
        :colorFill="transparent"
        emptyColor="#8ec5fc"
        :emptyColorFill="transparent"
        :size="150"
        :thickness="5"
        emptyThickness="7%"
        lineMode="in 1"
        :legend="true"
        :legendValue="1"
        :legendFormatter="
          ({ currentValue }) =>
            new Intl.NumberFormat('de-DE').format(currentValue)
        "
        legendClass="legend-custom-style"
        dash="60 0.9"
        animation="reverse 700 400"
        :noData="false"
        :loading="false"
        fontColor="white"
        :half="false"
        :gap="10"
        dot="20 blue"
        reverse
        fontSize="1rem"
        legend-value="progreso"
      >
                
        <template v-slot:legend-value>
          <span slot="legend-value">/{{progreso}}</span>
        </template>
        <template v-slot:legend-caption>
          <p slot="legend-caption">{{progreso}}</p>
        </template>
      </vue-ellipse-progress>






    </v-card>
  </v-app>
</template>

<script>
import Interval from "@/utils/interval";
export default {
  data(){
  return{
    
transparent:"transparent",
        datos:[],
         progreso:0,
         rating:22,
 
    
};    
},
methods: {
    randomizeOptions() {
      this.progreso = randomNumberInRange(0, 100);
      console.log(this.progreso)
    },
  },
  create(){
    this.randomizeOptions()
  },
  
  mounted() {

    Interval.addTask(this.randomizeOptions);
  },
}

</script>

<style></style>
