<template>
    <div>
              
         <button
         v-on:click="exportExcel"
         >EXPORTADOR</button>

    </div>


</template>

<script>
import XLSX from "xlsx"

export default {
  name: 'AnyComponentName',
  data () {
    return {
      dataToExport: [
        {
          name: 'Jorge',
          occupation: 'Best Admin'
        },
        {
          name: 'Héctor',
          occupation: 'Worst Admin'
        },
        {
          name: 'gmq',
          occupation: ':shrug:'
        }
      ]
    }
  },
  methods: {
    exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(this.dataToExport)
      const workbook = XLSX.utils.book_new()
      const filename = 'devschile-admins'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    }
  }
}
</script>

<style>

</style>