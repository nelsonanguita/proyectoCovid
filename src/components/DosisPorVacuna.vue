<template>
  <v-layout  mt-5>
    <v-flex sm6 xs12 md6 lg3>
      <v-card
        class="ma-3"
        max-width="240"
        max-height="100"
        elevation="15"
        :loading="loading"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-sheet color="orange" width="50" height="50" elevation="1">
              <v-icon dark large>mdi-needle</v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline text-right">PRIMERA DOSIS</div>

            <v-list-item-title class="headline mb-1 text-right">{{
              dosis1
            }}</v-list-item-title>
            <div></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>

    <v-flex sm6 xs12 md6 lg3>
      <v-card class="ma-3" max-width="240" max-height="100" elevation="15">
        <v-list-item>
          <v-list-item-avatar tile>
            <v-sheet color="blue" width="120" height="60" elevation="120">
              <v-icon dark large>mdi-signal-5g</v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline text-right">SEGUNDA DOSIS</div>
            <v-list-item-title class="headline mb-1 text-right">{{
              dosis2
            }}</v-list-item-title>
            <div></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>

    <v-flex sm6 xs12 md6 lg3>
      <v-card class="ma-3" max-width="240" max-height="100" elevation="15">
        <v-list-item>
          <v-list-item-avatar tile>
            <v-sheet color="green" width="120" height="60" elevation="120">
              <v-icon dark large>mdi-sword-cross</v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline text-right">DOSIS de refuerzo</div>
            <v-list-item-title class="headline mb-1 text-right">{{
              refuerzo
            }}</v-list-item-title>
            <div></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>

    <v-flex sm6 xs12 md6 lg3>
      <v-card class="ma-3" max-width="240" max-height="100" elevation="15">
        <v-list-item>
          <v-list-item-avatar tile>
            <v-sheet color="red" width="120" height="60" elevation="120">
              <v-icon dark large>mdi-radioactive</v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline text-right">Cuarta Dosis</div>
            <v-list-item-title class="headline mb-1 text-right">{{
              cuarta
            }}</v-list-item-title>
            <div></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>

    <v-flex sm6 xs12 md6 lg3>
      <v-card class="ma-3" max-width="240" max-height="100" elevation="15">
        <v-list-item>
          <v-list-item-avatar>
            <v-sheet color="pink" width="120" height="60" elevation="120">
              <v-icon dark large>mdi-emoticon-frown</v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="overline text-right">DOSIS UNICA</div>
            <v-list-item-title class="headline mb-1 text-right">{{
              unica
            }}</v-list-item-title>
            <div></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dosis1: "",
      dosis2: "",
      unica: "",
      cuarta:"",
      refuerzo: "",
      loading: true,
    };
  },
  methods: {
    async getVacunas() {
      try {
        let datos = await axios.get(
          "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto76/vacunacion_t.csv"
        );
        this.completDatos(datos.data);
      } catch (error) {
        console.log(error);
      }
    },

    completDatos(csv) {
      let lines = csv.split("\n");
      let f = 0;
      for (let i = lines.length - 2; i < lines.length - 1; i++) {
        let currentline = lines[i].split(",");
        //alert(new Intl.NumberFormat("de-DE").format(number));
        this.dosis1 = new Intl.NumberFormat("de-DE").format(currentline[1]); //primera dosis
        this.dosis2 = new Intl.NumberFormat("de-DE").format(currentline[2]); //segunda dosis
        this.unica = new Intl.NumberFormat("de-DE").format(currentline[3]); //unica dosis
        this.cuarta = new Intl.NumberFormat("de-DE").format(currentline[5]); //cuarta dosis
        this.refuerzo = new Intl.NumberFormat("de-DE").format(currentline[4]); //refuerzo dosis
      }
      this.loading = false;
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 200);
    },
  },
  created() {
    this.reserve();
    this.getVacunas();
  },
};
</script>

<style></style>
