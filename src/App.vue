<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span>Bushiroad</span>
        <span class="font-weight-light"> admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://https://bushi-eb532.firebaseapp.com"
        target="_blank"
      >
        <span class="mr-2">BushiRoad game</span>
      </v-btn>
      <v-btn v-if="$root.token" @click="logOut()">
        <span>Logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Login v-if="!$root.token"/>
      <Main v-else />
    </v-content>

    <v-snackbar
      v-model="snackbar"
      bottom
      :timeout="3000"
      :color="notice.type"
    >
      {{ notice.text }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Main from './components/Main'
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Main,
    Login
  },
  data () {
    return {
      snackbar: false,
      notice: {
        type: 'success',
        text: 'Success'
      }
    }
  },
  mounted() {
    this.$root.$on("notice", this.noticeEvent)
    this.$root.token = localStorage.getItem("token")
  },
  methods: {
    noticeEvent(type, text) {
      this.snackbar = true;
      this.notice.type = type;
      this.notice.text = text;
    },
    logOut() {
      this.$root.token = '';
      localStorage.setItem("token", this.$root.token)
    }
  }
}
</script>
