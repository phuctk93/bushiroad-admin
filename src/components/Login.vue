<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="$root.name" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field v-model="$root.pass" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: null
	}),
	methods: {
		login() {
      var rq = new XMLHttpRequest();
      rq.onload = () => {
        if (rq.status != 200) {
          this.$root.$emit("notice", "error", rq.responseText)
        } else {
					this.$root.token = rq.responseText;
					this.$root.pass = '';
					localStorage.setItem("token", this.$root.token)
				}
			}
			rq.onerror = err => {
				this.$root.$emit("notice", "error", err.error)
			}
			rq.open("POST", this.$root.host + ":5000/login")
			rq.send(
				JSON.stringify({name: this.$root.name, pass: this.$root.pass})
			)
    }
	}
}
</script>
