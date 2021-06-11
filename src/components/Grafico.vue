<template>
  <v-app>
    <div >
      <v-card elevation="12" class="mx-auto align-items-center">
        <h1>Estadística por comuna</h1>
        <ListaComunas
         @accion="agregarComuna"
        />
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
import ListaComunas from './ListaComunas.vue'
import axios from "axios";
export default {
  components:{
    ListaComunas
  },
  data() {
    return {
      Highcharts: Highcharts,
      info: [],
      listado: [],
      ordenamiento: [],
      chartOptions: {},
      loaded: false,
      fecha: [],

      temp:[]
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
        if (data[2] == "" &&  data[2] !== "Totales" && !(data[2].indexOf("Desconocido ") > -1)) {
          name = data[2].toUpperCase();
          color = this.colorHEX();
          for (var j = data.length - 18; j < data.length; j++) {
            totales.push(parseInt(data[j]));
          }

          this.info.push(new this.capturar(name, totales, color));
        }else if(data[2] !== "Totales" && !(data[2].indexOf("Desconocido ") > -1)){
          name = data[2].toUpperCase();
          color = this.colorHEX();
          for (var j = data.length - 18; j < data.length; j++) {
            totales.push(parseInt(data[j]));
          }
          this.temp.push(new this.capturar(name, totales, color));

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
    buscarComuna(val){
      if (val!="") {
            return this.temp.filter((item) =>
        item.name.includes(val.toUpperCase())
      );
      }
        
    },
     agregarComuna(){
               
      let comuna = localStorage.getItem("Comuna")
      if (comuna!="") {
        let busqueda = this.buscarComuna(comuna)
        this.info.push(new this.capturar(busqueda[0].name, busqueda[0].data, busqueda[0].color));
        this.getGrafico();
        busqueda = [];  
        localStorage.setItem("Comuna", " ");

      } 
    },
    
    obtenerLocalizacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.obtenerComuna(this.latitude,this.longitude)

          },
          (error) => {
            //alert(error.message)
            //console.log(error.message);
          }
        );
      } else {
        console.log("No activado");
      }
    },
  
    async obtenerComuna(latitud, longitud) {
      const api = "xBxkLZwLw6E21-txyCnFy_Hd4oo32F-CUH7rWoShsSg";
      const url = await axios.get(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${api}&mode=retrieveAddresses&prox=${latitud},${longitud}`);
      
      let datos = url.data.Response.View[0].Result[0].Location.Address.City
      localStorage.setItem("Comuna", datos);
      this.agregarComuna()
    },
  },
  created() {
    this.getDatos();
  //  this.obtenerLocalizacion();
  },
};
</script>

<style scoped>
@media only screen {
  #destacado {
    max-width: 700;
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
