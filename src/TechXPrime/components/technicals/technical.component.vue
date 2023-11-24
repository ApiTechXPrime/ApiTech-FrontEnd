<template>
  <div>
    <div class="prof-fa-use">
      <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-user-circle"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
              d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
          />
          <path
              d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
          />
          <path
              d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
          />
        </svg>
        <h3 id="prof-2">
          Profile
        </h3>
      </div>
      <div class="flex card justify-content-center" style="height: 470px; width: 90%;">
        <pv-card :data="selectedTechnical" v-if="selectedTechnical" style="width: 80%; ">
          <template #content>
            <div class="flex gap-4" >
              <div class="inf-t" style="font-size:22px;">
                <strong>Fullname:</strong> {{ selectedTechnical.fullName }}<br />
                <strong>Experience:</strong> {{ selectedTechnical.experience }}<br />
                <strong>Location:</strong> {{ selectedTechnical.location }}<br />
                <strong>Qualification:</strong> {{ selectedTechnical.qualification }}<br />
                <strong>About you:</strong> {{ selectedTechnical.aboutHim }}<br />
                <textarea
                    placeholder="add more features"
                    rows="4"
                    cols="70"
                ></textarea>
              </div>
              <div class="photo-2">
                <pv-image
                    :src="selectedTechnical.image"
                    alt="Imagen del técnico"
                    width="200"
                    height="250"
                />
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
    <div style="margin-top: 2%;">
      <h2 class="tex-2 ">Google Maps</h2>
      <input
          type="text"
          id="place_input"
          placeholder="Ingresa una ubicación"
          v-model="searchQuery"
      />
      <button id="bt2" @click="searchLocation" style="background-color: greenyellow;">Search</button>
      <div id="map" style="width: 55%; height: 430px;"></div>
    </div>
    <div >
      <h2 class="tex-3" style="margin-top:-31%;margin-left: 60%">REVIEWS</h2>
      <div class="btn-center" style="margin-left: 30%;margin-top: -20%;">
        <button id="bt1" @click="editProfile" style="background-color: #007bff; width: 30%; height: 10%; font-size: 27px; cursor: pointer; border: 5px solid deepskyblue; border-radius: 10px; font-weight: bold;">Edit Profile</button>
        <br><br><br>
        <button id="bt1" style="background-color: #007bff; width: 30%; height: 10%; font-size: 27px; cursor: pointer; border: 5px solid deepskyblue; border-radius: 10px; font-weight: bold;">Nothing Here yet</button>
      </div>
      <!-- edición del perfil -->
      <div v-if="isEditing" class="modal">
        <div class="modal-content" style="background-color:deepskyblue; border: 6px solid darkgrey; border-radius: 12px;">
          <div style="color: black;"><h2> <strong>Edit Profile</strong></h2></div>
          <form @submit.prevent="saveChanges">
            <div class="form-group" style="color: black; font-size: 18px;">
              <label for="name">Name:</label>
              <input style="padding: 5px; border: 2px solid darkgrey; font-size: 17px;" type="text" id="name" v-model="editedTechnical.fullName" />
            </div>
            <div class="form-group" style="color: black; font-size: 17px;">
              <label for="consultationPrice">Consultation Price:</label>
              <input style="padding: 5px;font-size: 17px; border: 2px solid darkgrey;" type="number" id="consultationPrice" v-model="editedTechnical.consultationPrice" />
            </div>
            <div class="form-group" style="color: black; font-size: 17px;">
              <label for="experience">Experience:</label>
              <select style="padding: 5px; font-size: 17px; border: 2px solid darkgrey;" id="experience" v-model="editedTechnical.experience">
                <option value="1-6 months">1-6 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2 years">2 years</option>
              </select>
            </div>
            <div class="form-group" style="color: black; font-size: 17px;">
              <label for="location">Location:</label>
              <input style="padding: 5px;font-size: 17px; border: 2px solid darkgrey;" type="text" id="location" v-model="editedTechnical.location" />
            </div>
            <div class="form-group" style="color: black; font-size: 17px;">
              <label for="aboutYou">About you:</label>
              <input style="padding: 5px; font-size: 17px; border: 2px solid darkgrey;" type="text" id="aboutYou" v-model="editedTechnical.aboutHim" />
            </div>
            <div class="form-group" style="color: black; font-size: 17px;">
              <label for="image">Change Photo:</label>
              <input style="padding: 5px; font-size: 17px; border: 2px solid darkgrey;" type="file" id="image" @change="changePhoto" accept="image/*" />
              <img v-if="editedTechnical.image" :src="editedTechnical.image" alt="Imagen seleccionada" style="max-width: 200px; max-height: 200px;" />
            </div>
            <button style="margin-left: 29%; font-weight: bold; font-size: 16px; background-color: green" type="submit">Save Changes</button>
          </form>
          <button style="font-weight: bold; font-size: 16px;" id="cancel" @click="cancelEditing">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {TechnicalApiService} from "@/TechXPrime/services/technical-api.service";
import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/ApiTechXPrime/dataApiTech';
export default {
  name: 'technical',
  data() {
    return {
      technicalService: null,
      technicals: [],
      selectedTechnical: null,
      isEditing: false,
      editedTechnical: {
        fullName: "",
        consultationPrice: 0,
        experience: "",
        location: "",
        aboutHim: "",
        image: '',
      },
      perCoords: { lat: -10.0, lng: -76.0 },
      map: null,
      marker: null,
      autocomplete: null,
      searchQuery: '',
    };
  },
  mounted() {
    this.loadGoogleMapsScript();
  },
  methods: {
    selectRandomTechnical() {
      const randomIndex = Math.floor(Math.random() * this.technicals.length);
      this.selectedTechnical = this.technicals[randomIndex];
    },
    editProfile() {
      this.editedTechnical = { ...this.selectedTechnical };
      this.isEditing = true;
    },
    changePhoto(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(selectedFile);
        this.editedTechnical.image = imageUrl;
      }
    },

    cancelEditing() {
      this.isEditing = false;
    },
    updateTechnical(technicalData) {
      const technicalId = technicalData.id;

      return axios.put(`${API_BASE_URL}/technicals/${technicalId}`, technicalData)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            throw error;
          });
    },
    saveChanges() {
      this.technicalService.updateTechnical(this.editedTechnical)
          .then(() => {
            this.selectedTechnical = { ...this.editedTechnical };
            this.isEditing = false;
          })
          .catch((error) => {
            console.error("Error al guardar los cambios:", error);
          });
    },

    //mapssss
    loadGoogleMapsScript() {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBtFMg2U6AAe0Yx6kFNqzDxyhe1Xs8MVuA&libraries=places&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onload = this.initMap;
      document.head.appendChild(script);
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.perCoords,
        zoom: 5,
      });
      this.marker = new google.maps.Marker({
        position: this.perCoords,
        map: this.map,
      });
      this.initAutocomplete();
    },
    initAutocomplete() {
      this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('place_input'));
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        this.map.setCenter(place.geometry.location);
        this.marker.setPosition(place.geometry.location);
      });
    },
    searchLocation() {
      const place = this.autocomplete.getPlace();
      this.map.setCenter(place.geometry.location);
      this.marker.setPosition(place.geometry.location);
    },
  },
  created() {
    this.technicalService = new TechnicalApiService();
    this.technicalService.getById()
        .then((response) => {
          this.technicals = response.data;
          this.selectRandomTechnical();
        });
  },
};
</script>

<style>
.prof-fa-use {
  color: black;
  font-weight: bold;
  text-align: left;
  margin: 2px 20px;
}

#map {
  width: 600px;
  height: 500px;
  border: 3px solid black;
  margin-left: 4%;
  margin-top: 1%;
}

.card {
  background-color: #007bff;
  margin-top: 0.6%;
  width: 140%;
  margin-left: 5%;
}
#prof-2{
  display: flex;
  margin-left: 3%;
  margin-top: -3%;
  padding: 4px;
  font-size: 25px;
}
.tex-2{
  margin-left: -78%;
  color: black;
  padding: 0;
}
#place_input{
  margin-left: -52%;
  width: 30%;
  height: 4vh;
  background-color: #f0f0f0;
  border: 3px solid midnightblue;
  border-radius: 5px;
}
.tex-3{
  margin-left: 48%;
  margin-top: -40%;
  color: black;
  display: flex;
  flex-direction: column;
  font-size: 29px;
}

.flex {
  display: flex;
}

.gap-4 > *:not(:last-child) {
  margin-right: 5rem;
}

.inf-t {
  font-size: 17px;
  line-height: 2;
}

.photo-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 5px solid black;
}

.btn-center {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 25%;
  margin-top: -20%;
}
//_::::::::::::::
#bt1{
  background-color: #007bff;
  color: black;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  border-radius: 10px;
}
#bt2{
  font-size: 22px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin: 10px 0;
}

form {
  display: flex;
  flex-direction: column;
}

input, select {
  margin-top: 5px;
  width: 100%;
}

button[type="submit"], #cancel {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 40%;
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}

#cancel {
  background-color: orange;
  color: black;
}

</style>