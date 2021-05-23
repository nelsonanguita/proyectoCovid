<template>
  <div>
    <v-hover>
      <v-card
        v-if="loaded"
        hover
        max-width="250"
        class="mx-auto pa-6 transition-swing"
      >
        <v-subheader>
          <p>Más casos activos</p>
          <p />
        </v-subheader>
        <v-divider inset></v-divider>
        <v-list-item dense v-for="(item, i) in listado" :key="i">
          <p>{{ i + 1 }} - {{ item.name }} {{ item.data }}</p>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listado: [],
      loaded: false,
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
      this.loaded = true;
    },
  },
  created() {
    this.getDatos();
  },
};
</script>

<style>
@media (prefers-color-scheme: dark) {
  div {
    --color-bg: rgb(53, 53, 53);
    --color-text: wheat;
  }

  div.light-theme {
    --color-bg: #dddddd;
    --color-text: #ee6352;
  }
}

div {
  background-color: var(--color-bg);
}

h1 {
  color: var(--color-text);
}

p {
  color: var(--color-text);
}
</style>
