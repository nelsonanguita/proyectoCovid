<template>
  <v-app>
    <div >
      <v-card elevation="12" class="mx-auto align-items-center">
        <h1>Estadística por comuna</h1>
        <highcharts
          v-if="loaded"
          id="destacado"
          class=" chart highcharts-figure"
          :options="chartOptions"
        ></highcharts>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Highcharts: Highcharts,
      info: [],
      listado: [],
      ordenamiento: [],
      chartOptions: {},
      loaded: false,
      fecha: [],
    };
  },
  methods: {
    async getDatos() {
      let datos = await axios.get(
        "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto19/CasosActivosPorComuna.csv"
      );
      this.getDiezComunas(datos.data);
    },
    getDiezComunas(datos) {
      let arrFechas = [];
      let name = "";
      let color = "";

      var lines = datos.split("\n");
      var headers = lines[0].split(",");
      for (let r = headers.length - 18; r < headers.length; r++) {
        arrFechas.push(headers[r]);
      }
      this.fecha = arrFechas;

      for (var i = 1; i < lines.length - 1; i++) {
        let data = lines[i].split(",");
        let totales = [];
        if (
          data[2] == "Pudahuel" ||
          (data[2] == "Lo Prado" &&
            data[2] !== "Totales" &&
            !(data[2].indexOf("Desconocido ") > -1))
        ) {
          name = data[2].toUpperCase();
          color = this.colorHEX();
          for (var j = data.length - 18; j < data.length; j++) {
            totales.push(parseInt(data[j]));
          }

          this.info.push(new this.capturar(name, totales, color));
        }
      }

      this.loaded = true;
      this.getGrafico();
    },
    capturar(name, tol, color) {
      this.name = name;
      this.data = tol;
      this.color = color;
    },
    getGrafico() {
      this.chartOptions = {
        chart: {
          type: "line",
          backgroundColor: "transparent",
          //  width: 600

          //       backgroundColor:{
          // },
        },
        title: {
          text: "Casos Activos",
        },
        subtitle: {
          text: "Fuente: Minsal",
        },
        xAxis: {
          categories: this.fecha,
        },
        yAxis: {
          title: {
            text: "",
          },
        },

        plotOptions: {
          series: {
            animation: {
              duration: 500,
            },
          },

          line: {
            dataLabels: {
              enabled: true,
              color: "white",
              style: {
                textShadow: false,
              },
            },
            enableMouseTracking: true,
          },
        },
        series: this.info,
      };
    },
    generarLetra() {
      var letras = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
      var numero = (Math.random() * 15).toFixed(0);
      return letras[numero];
    },
    colorHEX() {
      var coolor = "";
      for (var i = 0; i < 6; i++) {
        coolor = coolor + this.generarLetra();
      }
      return "#" + coolor;
    },
  },
  created() {
    this.getDatos();
  },
};
</script>

<style scoped>
@media only screen {
  #destacado {
    max-width: 600;
  }
}

.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.title {
  text-align: center;
}
</style>
