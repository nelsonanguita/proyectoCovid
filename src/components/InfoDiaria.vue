<template>
  <v-app>
    <v-item-group>
      <v-card
        elevation="12"
        max-width="400"
        height="550"
        class=" mx-auto  transition-swing"
      >
        <v-card-title class="group ">
          CASOS DIARIOS
          {{mensaje}}
        </v-card-title>

        <v-card
          elevation="5"
          class="mx-auto  pa-2 transition-swing"
          max-width="344"
          color="red darken-1"
        >
          <span class="group  pa-2 align-center">
            <v-avatar color="" size="65">
              <v-icon x-large> mdi-emoticon-sick-outline </v-icon>
            </v-avatar>
            <v-card-title>Casos nuevos</v-card-title>
            <v-card-title>{{ casosDiarios }}</v-card-title>
          </span>
        </v-card>

        <v-card
          class="mx-auto mt-4 pa-2 transition-swing"
          max-width="344"
          color="green"
          elevation="5"
        >
          <span class="group pa-2 align-center">
            <v-icon x-large> mdi-virus-outline</v-icon>

            <v-card-title>Activos</v-card-title>
            <v-card-title mensaje=1234 > {{ casosActivos }}</v-card-title>
          </span>
        </v-card>

        <v-card
          class="mx-auto mt-4  pa-2 transition-swing"
          max-width="344"
          color="deep-orange lighten-1"
          elevation="5"
        >
          <span class="group pa-2 align-center">
            <v-icon x-large> mdi-virus</v-icon>

            <v-card-title>Casos Totales</v-card-title>
            <v-card-title>{{ casosTotales }}</v-card-title>
          </span>
        </v-card>

        <v-card
          class="mx-auto mt-4 pa-2 transition-swing"
          max-width="344"
          color="grey darken-2"
          elevation="5"
        >
          <span class="group pa-2">
            <v-icon x-large> mdi-hospital </v-icon>

            <v-card-title>Fallecidos</v-card-title>
            <v-card-title>{{ fallecidos }}</v-card-title>
          </span>
        </v-card>
      </v-card>
    </v-item-group>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
    props:{
    mensaje:{
      type:String,
      default:"0"
    }
  },

  data() {
    return {
      resultado: [],
      casosDiarios: 0,
      casosActivos: 0,
      casosTotales: 0,
      fallecidos: 0,
    };
  },
  methods: {
    async getNacional() {
      try {
        let datos = await axios.get(
          "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv"
        );
        this.completDatos(datos.data);
      } catch (error) {
        console.log(error);
      }
    },
    completDatos(csv) {
      var lines = csv.split("\n");
      var headers = lines[0].split(",");
      for (var i = lines.length - 2; i < lines.length - 1; i++) {
        var currentline = lines[i].split(",");
        for (var j = 0; j < 1; j++) {
          if (
            !isNaN(
              parseInt(currentline[3])
                .toFixed()
                .toString()
            )
          ) {
            currentline[3] = parseInt(currentline[3])
              .toFixed()
              .toLocaleString("es-CL")
              .toString(); //Casos recuperados
          }

          currentline[5] = parseInt(currentline[5])
            .toFixed()
            .toString(); //Casos activos
          currentline[4] = parseInt(currentline[4])
            .toFixed()
            .toString(); //Fallecidos
          // currentline[1] = parseInt(currentline[1]).toFixed().toString() //Casos nuevos con sintomas
          //currentline[6] = parseInt(currentline[6]).toFixed().toString() //Casos nuevos sin sintomas

          if (
            !isNaN(
              parseInt(currentline[6])
                .toFixed()
                .toString()
            )
          ) {
            currentline[6] = parseInt(currentline[6])
              .toFixed()
              .toLocaleString("es-CL"); //Casos nuevos sin sintomas
          }

          currentline[7] = parseInt(currentline[7])
            .toFixed()
            .toString(); //Casos nuevos totales
          currentline[2] = parseInt(currentline[2])
            .toFixed()
            .toString(); //Casos totales
          this.resultado.push(currentline[0]); //fecha
          this.resultado.push(currentline[1]); //
          this.resultado.push(currentline[2]); //Casos totales
          this.resultado.push(currentline[3]); //casos recuoerados
          this.resultado.push(currentline[4]); //fallecidos
          this.resultado.push(currentline[5]); //casos activos
          this.resultado.push(currentline[6]); //casos sin sintomas
          this.resultado.push(currentline[7]); //casos totales acumulados
        }
      }
      //return resresultadoult;
      this.muestroDatos();
    },
    muestroDatos() {
      const locality = "da-DK"; //es-CL

      this.resultado[7] = parseInt(this.resultado[7]).toLocaleString(locality, {
        minimumFractionDigits: 0,
      });

      this.resultado[5] = parseInt(this.resultado[5]).toLocaleString(locality, {
        minimumFractionDigits: 0,
      });

      this.resultado[2] = parseInt(this.resultado[2]).toLocaleString(locality, {
        minimumFractionDigits: 0,
      });

      this.resultado[4] = parseInt(this.resultado[4]).toLocaleString(locality, {
        minimumFractionDigits: 0,
      });

      this.casosDiarios = this.resultado[7];
      this.casosActivos = this.resultado[5];
      this.casosTotales = this.resultado[2];
      this.fallecidos = this.resultado[4];
    },
  },
  created() {
    this.getNacional();
  },
};
</script>

<style scoped>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.title {
  text-align: center;
}
</style>
