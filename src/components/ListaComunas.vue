<template>
  <div>
    <div class="cuadroTexto">
      <span>
        <v-col cols="12" xs="8" sm="12" md="12" xl="12">
          <v-text-field
            type=" text"
            dense
            title=""
            outlined
            label="Buscar Comuna"
            class="form-control"
            v-model="search"
            onkeyup="javascript:this.value=this.value.toUpperCase();"
            v-on:keyup.enter="Accion"
            autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </span>
      <span>
        <v-col class="hijo">
          <v-btn v-on:click="Accion">AGREGAR</v-btn>
        </v-col>
      </span>
    </div>
    <div class="hijo" >
      <ul class="list-group" >
        <v-card  :elevation="23">
          <v-list v-if="verLista">
            <v-list-item-group  :multiple="multiple" color="light-blue" v-model="listaAgregar" >
              <v-list-item
              
                v-for="(item, i) in searchComuna"
                :key="i"
                v-bind:value="item"
              >
                <v-list-item-content  >
                  <v-select  v-text="item"> </v-select>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </ul>
    </div>
   
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      comunasLista: [],
      verLista: false,
      multiple: false,
      listaAgregar: "",
      search: "",
      latitude:0,
      longitude:0,

    };
  },
  methods: {
    async getComunas() {
      const comunas = await axios.get(
        "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto19/CasosActivosPorComuna.csv"
      );

      this.llenarArreglo(comunas.data);
    },
    llenarArreglo(csv) {
      let lines = csv.split("\n");

      for (var i = 1; i < lines.length - 1; i++) {
        let data = lines[i].split(",");

        if (data[2] !== "Total" && !(data[2].indexOf("Desconocido ") > -1)) {
          this.comunasLista.push(data[2].toUpperCase());
        }
      }
    },
    buscarComuna(val) {
      if (val != "") {
        return this.comunasLista.filter((item) =>
          item.includes(val.toUpperCase())
        );
      }
    },
    limpiar() {
      let comunaPrincipal = "PUDAHUEL";
      this.informacion = this.comunasLista.filter((item) =>
        item.includes(comunaPrincipal)
      );
      this.getGrafico();
      this.search = "";
    },
    Accion() {
      
      if (this.search != "") {
        localStorage.setItem("Comuna", this.search);
        this.$emit("accion");
        this.verLista = false;
        this.search = "";
      }
    },
  },
  computed: {
    //agregar ordenamiento
    searchComuna: function() {
      return this.comunasLista.filter((item) =>
        item.includes(this.search.toUpperCase())
      );
    },
  },
  watch: {
    search: function(val, oldval) {
      if (val != "") {
        this.verLista = true;
        this.searchComuna.sort((a, b) => b - a);
      } else {
        this.verLista = false;
      }
    },
    listaAgregar: function(val, oldval) {
       this.search = val;
       this.Accion()
      // this.agregarComuna();
      this.listaAgregar = "";
    },
  },
  created() {
    this.getComunas();

  },
};
</script>

<style scoped>
.hijo {
  position: relative;
  top: 3%;
}
.cuadroTexto {
  height: 60px;
  top: 11%;
  display: flex;
  justify-content: center;
}
</style>
