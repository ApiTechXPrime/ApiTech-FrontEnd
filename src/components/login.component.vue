<script>
import {LoginApiService} from "@/services/login-api.service";

export default{
  name:"login",
  data(){
    return {
      users: {
        clients: [],
        technicals: []
      },
      email: '',
      password: '',
      showErrorEmail: false,
      showErrorPassword: false,
      showErrorUser: false,
      contentVerified: false,
      existUser: false,
      loginService:null,
    };
  },
  methods:{
    login(){
      this.verifyContent();
      this.verifyUser();
      if(this.contentVerified && this.existUser)
      {
        this.goToHome()
      }
    },
    verifyContent(){
      this.showErrorEmail = this.email === '';
      this.showErrorPassword = this.password === '';
      this.contentVerified = !(this.showErrorEmail || this.showErrorPassword)
    },
    verifyUser(){
      if(this.email !== '' && this.password !== ''){
        for (let client of this.users.clients){
          if(client.email === this.email && client.password === this.password){
            this.existUser = true;
          }
        }
        for (let technical of this.users.technicals){
          if(technical.email === this.email && technical.password === this.password){
            this.existUser = true;
          }
        }
        this.showErrorUser = this.existUser === false;
      }
    },
    goToRegister(){
      this.$router.push('/register');
    },
    goToHome(){
      this.$router.push('/home');
    }
  },
  created(){
    this.loginService = new LoginApiService();
    this.loginService.getUsers()
        .then((response) => {
              this.users = response.users
            }
        )
  }
}
</script>

<template>
  <pv-toolbar style="background-color: #72B4EF">
    <template #center>
      <pv-image src="https://cdn.discordapp.com/attachments/1150323230058491985/1157150093502333019/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f356b614c575f54644d724c61772d7847494953554330722d7949754c64717756506e72675771545466645a644c3447596447437865745157352d636872526a372d6b37442d39764b657755646734524747694a73786746396763747247784f674c7850694f50484b71536a48646d637a5f2d44453136662d46497542365f7341486c5a643579712d4e7472536c4e496e72333268767577.png?ex=65178f81&is=65163e01&hm=62d33c739bc6cb6d67cf48604087a8b6878fe8abc0801af25b136be5fba164e8&" alt="Logo de ApiTechXPrime" width="55"/>
      <div class="m-2">
        TECHXPRIME
      </div>
    </template>
  </pv-toolbar>
  <div class="card">
    <pv-card class="form">
      <template #title> Log In </template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="email">Email</label>
          <pv-input-text id="email" v-model="email" aria-describedby="email-error" />
          <small v-if="showErrorEmail">Your email is required</small>
          <label for="password">Password</label>
          <pv-password id="password" v-model="password" aria-describedby="password-error" input-class="w-full" :feedback="false"/>
          <small v-if="showErrorPassword">Your password is required</small>
        </div>
      </template>
      <template #footer>
        <pv-button label="Enter" @click="login()"/>
        <div class="mt-2">
          <small v-if="showErrorUser">Incorrect email or password. Please try again</small>
        </div>
        <div class="flex justify-content-center mt-2">
          <label>Don’t have an account?</label>
          <pv-button class="m-0 p-0" label="Sing Up" link @click="goToRegister()"/>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.form{
  width: 25em;
  text-align: center;
  background-color: #72B4EF;
}

.card{
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
</style>