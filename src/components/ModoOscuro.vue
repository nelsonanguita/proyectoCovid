<template>
  <v-card
    flat
    
  >
    <v-toolbar
      flat
      height="72"

    >
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch>
    </v-toolbar>
   
  </v-card>
</template>
<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({ items: ['One', 'Two', 'Three'] }),
  }
</script>

<style>

</style>