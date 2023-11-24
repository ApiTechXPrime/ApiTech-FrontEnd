<template>
  <div>
    <div class="flex card-container justify-content-center" style="height: 470px; width: 90%;">
      <div v-for="technician in technicians" :key="technician.id" class="pv-card">
        <div class="technician-details">
          <img :src="technician.image" alt="Técnico" class="technician-image" />
          <div class="details">
            <h2>{{ technician.fullName }}</h2>
            <p><strong>Qualification:</strong> {{ technician.qualification }}</p>
            <p><strong>Location:</strong> {{ technician.location }}</p>
            <p><strong>Consultation Price:</strong> {{ technician.consultationPrice }}</p>
          </div>
          <button @click="viewTechnicianDetails(technician)" style="background-color: greenyellow; border-radius: 10px; color: black; width: 28%; font-weight: bold; font-size: 18px; height: auto; cursor: pointer;">View</button>
        </div>
        <div v-if="selectedTechnical && selectedTechnical.id === technician.id" class="detail-card overlay" style="width: 60%;">
          <div>
            <h2>{{ selectedTechnical.fullName }}</h2>
            <p><strong>Experience:</strong> {{ selectedTechnical.experience }}</p>
            <p><strong>Location:</strong> {{ selectedTechnical.location }}</p>
            <p><strong>Qualification:</strong> {{ selectedTechnical.qualification }}</p>
            <p><strong>About you:</strong> {{ selectedTechnical.aboutHim }}</p>
          </div>
          <div class="photo">
            <img :src="selectedTechnical.image" alt="Imagen del técnico" />
          </div>
          <button @click="sendRequest" style="background-color: greenyellow; border-radius: 8px; color: black; width: 28%; font-weight: bold; font-size: 22px; height: auto; cursor: pointer;">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ListTechnicalApiService } from "@/TechXPrime/services/list-technical.api.service";
import router from "@/router";

export default {
  name: 'technicians',
  setup() {
    const technicians = ref([]);
    const selectedTechnical = ref(null);

    const loadTechnicians = async () => {
      const service = new ListTechnicalApiService();
      try {
        const response = await service.getClients();
        technicians.value = response.data;
      } catch (error) {
        console.error('Error loading technicians:', error);
      }
    };

    const redirectToTechnicianProfile = (id) => {
      router.push(`/technician/${id}`);
    };

    const viewTechnicianDetails = (technician) => {
      console.log('Clicked!', technician.id, selectedTechnical.value ? selectedTechnical.value.id : null);
      selectedTechnical.value = selectedTechnical.value === technician ? null : technician;
    };

    loadTechnicians();

    return {
      technicians,
      selectedTechnical,
      viewTechnicianDetails,
      redirectToTechnicianProfile
    };
  },

  methods: {
    sendRequest() {
      this.$router.push({ path: '/sideBarClient/requests/'+this.selectedTechnical.id });
    },

  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 -10px;
}

.pv-card {
  width: calc(28.33% - 20px);
  margin: 30px 20px;
  box-sizing: border-box;
  background-color: deepskyblue;
  border: 2px solid grey;
  padding: 8px;
  border-radius: 10px;
  top: 10%;
}

.pv-card:nth-child(3n) {
  margin-right: 0;
}

.technician-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 10px;
}

.technician-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.detail-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 80%;
  background-color: white;
  border: 2px solid grey;
  padding: 16px;
  border-radius: 10px;
}

.details {
  flex: 1;
}

h2 {
  margin-bottom: 5px;
}

p {
  margin: 5px 0;
}

</style>
