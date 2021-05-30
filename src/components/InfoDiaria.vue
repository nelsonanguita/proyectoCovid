<template>
  <v-app>
    <v-item-group >
      <v-card  elevation="12" max-width="400" height="550" class=" mx-auto  transition-swing">
        <v-card-title class="group " >
          CASOS DIARIOS
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
            <v-card-title>0</v-card-title>
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
            <v-card-title>0</v-card-title>
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
          

            <v-card-title>Titulo</v-card-title>
            <v-card-title>0</v-card-title>
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

            <v-card-title>Titulo</v-card-title>
            <v-card-title>0</v-card-title>
          </span>
        </v-card>
      </v-card>
    </v-item-group>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>

.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.title{
   text-align: center; 
}

</style>
