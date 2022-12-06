<template>
 
    <v-content class="mt-5">
      <v-card class="mx-auto mt-16" width="500" elevation="2">
       <v-card-title>LOG IN</v-card-title>
       <v-card-text>
        <v-text-field 
          label="Username" 
          v-model="username"
          prepend-icon="mdi-account-circle">
        </v-text-field>
        <v-text-field 
          label="Password" 
          v-model="password" 
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock" 
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword =!showPassword"
          >
        </v-text-field>
       
       </v-card-text>
       <v-divider></v-divider>
       <v-card-actions>
        <v-btn color="info" @click="loginApp">Login</v-btn>
        
       </v-card-actions>
       <v-alert v-if="error" color="pink darken-1" dark>
          {{ error.message }}
        </v-alert>
      
      </v-card>
       
    </v-content>
 
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => {
    return{
        username: "",
        password: "",
        email: "",
        error: "",
        showPassword: false
    }
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async loginApp() {
      const { username, password } = this;
      try { 
        await this.login({ username, password });
      } catch (error) {
        this.error = error;
      }
    },
  },
}
</script>