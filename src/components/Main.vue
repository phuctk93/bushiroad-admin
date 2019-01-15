<template>
  <v-container>
    <v-btn @click="exportData()">Export All</v-btn>
    <v-data-table
      :headers="headers"
      :items="records"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.score }}</td>
        <td class="text-xs-left">{{ props.item.rank }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.reg }}</td>
        <td class="text-xs-left">{{ props.item.esign }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: 'S/N', value: 'id' },
        { text: 'Score', value: 'score' },
        { text: 'Current Position', value: 'rank' },
        { text: 'Name', value: 'name' },
        { text: 'Email Adresses', value: 'email' },
        { text: 'Date/Time Registed', value: 'reg' },
        { text: 'E-Letter sign up', value: 'esign' }
      ],
      records: []
    }),
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        var rq = new XMLHttpRequest();
        rq.onload = () => {
          if (rq.status != 200) {
            this.$root.$emit("notice", "error", rq.responseText)
          } else {
            this.records = JSON.parse(rq.responseText)
          }
        }
        rq.onerror = err => {
          this.$root.$emit("notice", "error", err.error)
        }
        rq.open("GET", this.$root.host + ":5000/adm/list")
        rq.setRequestHeader("Authorization", this.$root.token)
        rq.send()
      },
      exportData() {
        var rq = new XMLHttpRequest();
        rq.onload = () => {
          if (rq.status != 200) {
            this.$root.$emit("notice", "error", rq.responseText)
          } else {
            var blob = new Blob([rq.response], {type: "application/csv"});
            var fileName = "all.csv"
            var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=fileName;
            link.click();
            this.$root.$emit("notice","sucess", "Download request was successful.");
          }
        }
        rq.onerror = err => {
          this.$root.$emit("notice", "error", err.error)
        }
        rq.open("GET", this.$root.host + ":5000/adm/export")
        rq.setRequestHeader("Authorization", this.$root.token)
        rq.send()
      }
    }
  }
</script>

<style>

</style>
