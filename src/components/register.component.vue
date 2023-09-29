<script>
import {RegisterApiService} from "@/register/services/register-api.service";
export default {
  name: "login",
  data(){
    return{
      registerApiService: null,
      userClient: {},
      userTechnical: {},
      newUser:{},
      fullName: '',
      email: '',
      birthday: '',
      password: '',
      confirmPassword: '',
      selectedRole: '',
      roles:["Client", "Technical"],
      showErrorFullName: false,
      showErrorEmail: false,
      showErrorBirthday: false,
      showErrorPassword: false,
      showErrorConfirmPassword: false,
      showErrorSelectedRole: false,
      showErrorExistingEmail: false,
      contentVerified: false,
      existingEmail: true,
      userCreated: false,
    };
  },
  methods:{
    register(){
      this.verifyContent()
      this.verifyExistingEmail()
      if(this.contentVerified && !this.existingEmail)
      {
        if(this.selectedRole === 'Technical')
        {
          this.newUser =
              {
                "id": 0,
                "fullName": this.fullName,
                "email": this.password,
                "password": this.password,
                "birthday": this.birthday,
                "experience": "",
                "qualification": 0,
                "location": "",
                "aboutHim": ""
              }
          this.registerApiService.createTechnical(this.newUser)
          this.userCreated = true
        }
        else
        {
          this.newUser =
              {
                "id": 0,
                "fullName": this.fullName,
                "email": this.password,
                "password": this.password,
                "birthday": this.birthday
              }
          this.registerApiService.createClient(this.newUser)
          this.userCreated = true
        }
      }
      this.goToLogin()
    },
    verifyContent(){
      this.showErrorFullName = this.fullName === '';
      this.showErrorEmail = this.email === '';
      this.showErrorBirthday = this.birthday === '';
      this.showErrorPassword = this.password === '';
      this.showErrorConfirmPassword = this.confirmPassword !== this.password;
      this.showErrorSelectedRole = this.selectedRole === '';
      this.contentVerified = !(this.showErrorFullName || this.showErrorEmail
          || this.showErrorBirthday || this.showErrorPassword || this.showErrorConfirmPassword
          || this.showErrorSelectedRole)
    },
    verifyExistingEmail(){
      Promise.all([
        this.registerApiService.getClientByEmail(this.email),
        this.registerApiService.getTechnicalByEmail(this.email)
      ]).then((responses) => {
        this.userClient = responses[0].data;
        this.userTechnical = responses[1].data;
        if (Object.keys(this.userClient).length === 0 && Object.keys(this.userTechnical).length === 0) {
          this.existingEmail = false;
        }
      })
      if(this.existingEmail && this.contentVerified){
        this.showErrorExistingEmail = true
      }
    },
    goToLogin(){
      if(this.userCreated)
      {
        this.$router.push('/login')
      }
    }
  },
  created(){
    this.registerApiService = new RegisterApiService()
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
      <template #title>Sign Up</template>
      <template #content>
        <div class="flex justify-content-between">
          <div class="flex flex-column gap-2 w-5">
            <label for="password">Full name</label>
            <pv-input-text id="fullName" v-model="fullName" aria-describedby="fullName-error" />
            <small v-if="showErrorFullName">Your full name is required</small>
            <label for="email">Email</label>
            <pv-input-text id="email" v-model="email" aria-describedby="email-error" />
            <small v-if="showErrorEmail">Your email is required</small>
            <label for="email">Birthday</label>
            <pv-calendar id="birthday" v-model="birthday" aria-describedby="birthday-error" showIcon dateFormat="dd/mm/yy"/>
            <small v-if="showErrorBirthday">Your birthday is required</small>
          </div>
          <div class="flex flex-column gap-2 w-5">
            <label for="password">Password</label>
            <pv-password id="password" v-model="password" aria-describedby="password-error" toggleMask input-class="w-full"/>
            <small v-if="showErrorPassword">Your password is required</small>
            <label for="email">Confirm password</label>
            <pv-password id="confirmPassword" v-model="confirmPassword" aria-describedby="confirmPassword-error" :feedback="false" toggleMask input-class="w-full"/>
            <small v-if="showErrorConfirmPassword">Password and confirmation password do not match</small>
            <label for="role">Select your role</label>
            <pv-dropdown id="selectedRole" v-model="selectedRole" :options="roles" aria-describedby="selectedRole-error"/>
            <small v-if="showErrorSelectedRole">Your role is required</small>
          </div>
        </div>
      </template>
      <template #footer>
        <pv-button label="Register" @click="register()"/>
        <div class="mt-2">
          <small v-if="showErrorExistingEmail">The email is already registered</small>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.form{
  width: 70em;
  text-align: center;
}

.card{
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

</style>