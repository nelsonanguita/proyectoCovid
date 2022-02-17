<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-item-group>

        <v-card
          elevation="5"
        class=" mx-auto  transition-swing"
          width="600"
          
        >
          <v-card-title primary-title class="justify-center">
            Casos por Regiones
          </v-card-title>
          <v-card-subtitle>
            Activos confirmados
          </v-card-subtitle>


          <v-card-actions class="justify-center">
            <apexchart

            type="treemap"
            :series="series"
            :options="chartOptions"
          >
          </apexchart>
            </v-card-actions >
          
        </v-card>
            </v-item-group>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Width: '50',
      vb_celular:false,
      data:[],
      series: [],
      chartOptions: {},
      
    };
  },

  methods: {
    cargaOpcionesGrafico() {
      this.chartOptions = {
        legend: {
          show: false,
        },
          tooltip: {
            theme: 'dark'
        },


        chart: {
          height: 350,
          type: "treemap",
        },
        title: {
          //text: "Basic Treemap",
        },
        chart:{
                    toolbar: {
          show:true,
          tools: {
            Selection: true,
            download:false
          },
        },
        },
        plotOptions: {
         treemap: {
                enableShades: true,
                shadeIntensity: 0.2,
                reverseNegativeShade: true,
                colorScale: {
                  ranges: [
                    {
                      from: 0,
                      to: 5000,
                      color: '#4CAF50'
                    },
                    {
                      from: 5001,
                      to: 9999,
                      color: '#FFD800'
                    },
                    {
                      from: 10000,
                      to: 50000,
                      color: '#ff0000'
                    }
                  ]
                }
              }
        }
      };
      this.series=[
        {
          data :this.data
          
        }
      ]
      
      
    },

    async obtenerDatosRegiones() {
      
            
      try {
        let datos = await axios.get(
          "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto4/2022-02-17-CasosConfirmados-totalRegional.csv"
        );
               
        let lines = datos.data.split("\n");
        for (let i = 1 ; i < lines.length; i++) {
        
        
        let currentline = lines[i].split(",");
          for (let j = 0; j < 1; j++) {
            
            if ((currentline[0]!="Total")&(currentline[0]!="Se desconoce@")) {
             this.data.push(new this.objetoDatos(currentline[0], currentline[13]));
              
           }
                     
          }

        }
    this.cargaOpcionesGrafico();


      } catch (error) {
        console.log(error);
      }
    },

    objetoDatos(name, cantidad) {
      this.x = name;
      this.y = cantidad;
    },
    detectarCelular(){
      if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
          )
           {
          this.vb_celular=true  
          }
    }

  },
  created() {
    this.obtenerDatosRegiones();
  },
};
</script>

<style></style>
