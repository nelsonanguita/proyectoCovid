<template>
  <v-app>
    <div>
      <v-hover>
        <v-card
          elevation="24"
          :loading="loading"
          hover
          max-width="250"
          class="mx-auto transition-swing"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="3"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title class="title">
            MÁS CASOS ACTIVOS
          </v-card-title>

          <v-divider inset></v-divider>
          <v-list-item dense v-for="(item, i) in listado" :key="i">
            <p>{{ i + 1 }} - {{ item.name }} {{ item.data }}</p>
          </v-list-item>
        </v-card>
      </v-hover>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listado: [],
      active: false,
      loading: false,
    };
  },
  methods: {
    async getDatos() {
      let datos = await axios.get(
        "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto19/CasosActivosPorComuna.csv"
      );
      this.getDiezComunas(datos.data);
    },
    capturar(name, tol) {
      this.name = name;
      this.data = tol;
    },
    getDiezComunas(datos) {
      let name = "";
      let totales = 0;
      let ordenamiento = [];

      let lines = datos.split("\n");

      for (let i = 1; i < lines.length - 1; i++) {
        let data = lines[i].split(",");
        name = data[2];
        totales = parseInt(data[data.length - 1]);
        ordenamiento.push(new this.capturar(name, totales));
      }

      ordenamiento.sort(function(a, b) {
        return b.data - a.data;
      });
      let contador = 0;
      Object.entries(ordenamiento).forEach(([key, value]) => {
        if (
          value.name !== "Total" &&
          !(value.name.indexOf("Desconocido ") > -1)
        ) {
          if (contador <= 10) {
            //this.info.push(new this.capturar(value.name, parseInt(value.data)));
            this.listado.push(
              new this.capturar(value.name, parseInt(value.data))
            );
            contador++;
          }
        }
      });
      this.loading = false;
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 200);
    },
  },
  created() {
    this.getDatos();
    this.reserve();
  },
};
</script>

<style scoped>
.abs-center {
  display: flex;
  align-items: left;
  justify-content: left;
  min-height: 100vh;
}

.title {
  text-align: center;
}
</style>
