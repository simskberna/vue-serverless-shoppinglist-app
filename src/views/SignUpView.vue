<!-- eslint-disable prettier/prettier -->
<template>
  <v-content v-if="!confirmPassword" class="mt-5">
    <v-card class="mx-auto mt-16" width="500" elevation="2">
     <v-card-title>SIGN UP</v-card-title>
     <v-card-text>
      <v-text-field 
        label="Username" 
        v-model="username"
        prepend-icon="mdi-account-circle">
      </v-text-field>
      <v-text-field 
        label="Email" 
        v-model="email"
        prepend-icon="mdi-email"
        >
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
      <v-btn @click="signUpApp" color="success">Register</v-btn>
     </v-card-actions>
     <v-alert v-if="error" color="pink darken-1" dark>
        {{ error.message }}
      </v-alert>
    
    </v-card>
  </v-content>
    <v-content v-else-if="confirmPassword" class="mt-5">
    <v-card class="mx-auto mt-16" width="500" elevation="2">
     <v-card-title>CONFIRM</v-card-title>
     <v-card-text>
      <v-text-field 
        label="Username" 
        v-model="username"
        prepend-icon="mdi-account-circle">
      </v-text-field>
      <v-text-field 
          label="Code" 
          v-model="code" 
          prepend-icon="mdi-numeric" 
          >
        </v-text-field>
     </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
      <router-link to="/" style="text-decoration: none; color: inherit;" tag="v-btn" >
        <v-btn @click="confirmSignUpApp" color="info" >Confirm</v-btn>
      </router-link>
      
     </v-card-actions>
     <v-alert v-if="error" color="pink darken-1" dark>
        {{ error.message }}
      </v-alert>
    
    </v-card>
     
  </v-content>
  
</template>
<script>
import router from "@/router/router";
import { mapActions,mapState } from 'vuex';
export default {
  data:() => ({
    username :'',
    password :'',
    email: '',
    code: '',
    confirmPassword: false,
    showPassword: false,
    error: ''
  }),
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods:{
        ...mapActions('auth',['signUp','confirmSignUp','login']),
        async signUpApp(){ 
          const { username, password, email} = this;
          if(!email || !password){
            return;
          }
          try{
            await this.signUp({username,password,email})
            this.confirmPassword = true
          }catch(error){
            this.error = error;
          }
         },
         async confirmSignUpApp(){
          const  { username, code} = this;
          if(!username || !code){
            return;
          }
          try{
            await this.confirmSignUp({username,code})
          }catch(error){    
            this.error = error;
          }
         }
    
  }
}
</script>
