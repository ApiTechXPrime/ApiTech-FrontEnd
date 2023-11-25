<template>
  <div class="card">
    <pv-card>
      <template #content>
        <div class="flex justify-content-center">
          <div class="flex flex-column gap-2 w-5">

            <label for="name">Full name</label>
            <pv-input-text id="name" v-model="name"  />
            <small v-if="showErrorName">Your full name is required</small>



            <label for="numberphone" >Number Phone</label>
            <pv-input-text id="numberphone" v-model="numberphone"  />
            <small v-if="showErrorNumberPhone">Your Number is required</small>


            <label for="cellphone" > Phone's Brand </label>
            <pv-input-text id="cellphone" v-model="cellphone"  />
            <small v-if="showErrorcellphone">Your Brand of Cellphone is required</small>


            <label for="day">Day</label>
            <pv-input-text id="day" v-model="day"  />
            <small v-if="showErrorDay">The day is required</small>


            <label for="hour">Hour</label>
            <pv-input-text id="hour" v-model="hour" />
            <small v-if="showErrorHour">The Hour is required</small>


            <label for="problem">Problem</label>
            <pv-input-text id="problem" v-model="problem"  />
            <small v-if="showErrorproblem">The problem is required</small>


            <label for="specification">Specification</label>
            <pv-input-text id="specification" v-model="specification"  />
            <small v-if="showErrorspecification">The Specification is required</small>


          </div>
        </div>
      </template>
      <template #footer>
        <pv-button label="Send" @click="sendRequest()"/>
      </template>
    </pv-card>
  </div>
</template>
<script>
import {RequestApiService} from "@/TechXPrime/services/request-api.service";

export default {
  name:"request",
  data() {
    return {
      requestService: null,
      technicalId: 0,
      name: '',
      numberphone: '',
      newResquest:{},
      day: '',
      hour: '',
      cellphone: '',
      problem: '',
      specification: '',
      showErrorName: false,
      showErrorNumberPhone: false,
      showErrorHour: false,
      showErrorDay: false,
      showErrorcellphone: false,
      showErrorproblem: false,
      showErrorspecification: false,
      requestCreated: false,
      contentVerified:false,
    };
  },
  methods: {



    sendRequest(){
      this.verifyContent();

      if(this.contentVerified)
      {
        this.newResquest =

            {
             "id": 0,
              "technicalId": this.technicalId,
             "name": this.name,
             "numberphone": this.numberphone,
             "day": this.day,
              "hour": this.hour,
             "cellphone": this.cellphone,
             "problem": this.problem,
             "specification": this.specification
          };

        if (this.requestService) {
          this.requestService.createRequest(this.newResquest)
              .then(() => {
                this.requestCreated = true;
                this.goToLogin();
              })
              .catch(error => {
                console.error('Error creating request:', error);
              });
        }
      }

    },
    verifyContent(){

        this.showErrorName = this.name === '';
        this.showErrorNumberPhone = this.numberphone === '';
          this.showErrorDay = this.day === '';
          this.showErrorcellphone = this.cellphone === '';
          this.showErrorproblem =  this.problem === '';
          this.showErrorspecification =  this.specification === '';
          this.showErrorHour=this.hour==='';
      this.contentVerified = !(this.showErrorNumberPhone || this.showErrorDay
          || this.showErrorcellphone || this.showErrorproblem || this.showErrorspecification
          || this.showErrorName|| this.showErrorHour)
    },

    goToLogin(){
      if(this.requestCreated)
      {
        this.$router.push(`/sideBarClient/${this.$route.params.clientId}/homeClient`)
      }
    }


  },
  created(){
    this.requestService = new RequestApiService();
    this.technicalId = this.$route.params.technicalId;
  },

};
</script>


<style>
/* Estilos para el formulario */
form {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #72B4EF;
  background-color: #72B4EF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position:absolute;
  top:290px;
}

/* Estilos para los campos del formulario */
form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  border-radius:20px;
}

form input[type="text"],
form input[type="email"],
form input[type="date"],
form input[type="time"],
form select,
form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Estilos para el botón de envío */
form button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

</style>