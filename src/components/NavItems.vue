<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names  eslint-disable prettier/prettier -->
<template>
  
    <v-app-bar app dark color="blue" >
      
      <v-card-text style="text-align:left;font-weight:bold;font-size:20px">SHOPPING LIST</v-card-text>
      <v-spacer></v-spacer>
     <router-link to="/signup"  v-if="!user" style="text-decoration: none;color: inherit;margin-right: 10px;" tag="v-btn" >
          Sign Up
        </router-link>

        <router-link to="/" v-if="!user"  style="text-decoration: none; color: inherit;" tag="v-btn" >
          Log In
        </router-link>  
       
      <v-icon  v-if="user" @click="handleLogOut"  large color="white darken-2">
        mdi-logout
      </v-icon>
    
       
    </v-app-bar>
  </template>
  <script>
  import { mapState, mapActions } from "vuex";
  import router from "@/router/router";
  import { Auth } from 'aws-amplify';
  export default {
    components:{
  
    },
    computed: {
      ...mapState("auth", ["user"]),
    },
    methods: {
      ...mapActions("auth", ["logout"]),
      async handleLogOut() { 
        await this.logout();
        router.push({ name: "HomeView" });
      },
      async handleLogIn() {
        router.push({ name: "HomeView" });
      },
      async handleSignUp() {
        router.push({ name: "SignUpView" });
      },
      async handleList() {
        router.push({ name: "ListView" });
      },
       
    },
  };
  </script>
  