<template>
  <div>
    <v-row>
      <v-col cols="12" xs="7" sm="12" md="6" lg="6" xl="6">
        <v-card
          elevation="5"
          class="mx-auto  pa-2 transition-swing"
          width="340"
          height="280"
        >
          <v-card-title primary-title class="justify-center">
            POSITIVIDAD DE EXÁMENES PCR ( HOY = {{positividadDiaria}}%)
          </v-card-title>
          <apexchart
            width="320"
            type="line"
            :series="series2"
            :options="chartOptions"
          >
          </apexchart>
        </v-card>
      </v-col>

      <v-col cols="12" xs="7" sm="12" md="6" lg="6" xl="6">
        <v-card
          elevation="5"
          class="mx-auto pa-2 transition-swing"
          width="340"
          height="240"
        >
          <v-card-title>
            CAMAS CRITICAS
          </v-card-title>

          <apexchart
            width="320"
            type="pie"
            :series="serie"
            :options="chartOptions2"
            height="170"
          >
          </apexchart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      positividadDiaria:0,
      resultado:[],
      categorias:[],
      serie: [],
      series2: [],
      chartOptions: {},
            chartOptions2: {},

    };
  },

  methods: {
    positividad() {
      this.chartOptions = {
            xaxis: {
              categories: this.categorias,
            },
          legend: {
          show: false,
        },
      };
    },
    camasUCI() {
      this.chartOptions2 = {
            xaxis: {
              categories: this.categorias,
            },
          labels: ['Disponibles ', 'Ocupadas '],
          colors: ['#002FA7', '#E60026'],
          legend: {
          show: true,
        },
      };
    },
    async obtenerPosividad() {
      try {
        let datos = await axios.get(
          "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto49/Positividad_Diaria_Media_T.csv"
        );
        let lines = datos.data.split("\n");
        for (let i = lines.length - 60; i < lines.length; i++) {
          let currentline = lines[i].split(",");
          for (let j = 0; j < 1; j++) {
            currentline[0] = currentline[0]; //Cfecha

                let total =  currentline[4]
                if (!isNaN( total )) {
                    this.resultado.push(parseFloat((total*100).toFixed(2))); //post
                    this.categorias.push(currentline[0]).toFixed().toString(); //fecha
                    this.positividadDiaria=parseFloat((total*100).toFixed(2))
                }
          }
        }

        this.series2.push(new this.objetoDatos("Positividad",this.resultado));
        this.positividad();
        

      } catch (error) {
        console.log(error);
      }
    },

        async obtenerCamas() {
      try {
        let datos = await axios.get(
          "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto20/NumeroVentiladores_T.csv"
        );
        let lines = datos.data.split("\n");
        for (let i = lines.length - 2; i < lines.length-1; i++) {
          let currentline = lines[i].split(",");
            for (let j = 0; j < 2; j++) {

               if (j<1) {
                 this.serie.push(parseInt(currentline[2]),parseInt(currentline[3]));
               }


                    // console.log(parseInt(currentline[2]),parseInt(currentline[3]));

          }
        }
        this.camasUCI();

      } catch (error) {
        console.log(error);
      }
    },
    objetoDatos( name, cantidad) {
      this.name = name;
      this.data = cantidad;
    },


  },
  created() {
    this.obtenerPosividad();
    this.obtenerCamas();
  },

};
</script>

<style></style>
