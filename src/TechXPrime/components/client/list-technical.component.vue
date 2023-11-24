<template>
  <div>
    <div class="prof-fa-use">
      <div class="card-container">
        <div class="pv-card" v-for="technician in technicians" :key="technician.id">
          <div class="technician-details">
            <img :src="technician.image" alt="Técnico" class="technician-image" />
            <div class="details">
              <h2>{{ technician.fullName }}</h2>
              <p><strong>Qualification:</strong> {{ technician.qualification }}</p>
              <p><strong>Location:</strong> {{ technician.location }}</p>
              <p><strong>Consultation Price:</strong> {{ technician.consultationPrice }}</p>
            </div>
            <button @click="viewTechnicianDetails(technician.id)" style="background-color: greenyellow; border-radius: 10px; color: black; width: 20%; font-weight: bold; font-size: 18px; height: auto; cursor: pointer;">View</button>
          </div>
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
  props: {
    technician: {
      type: Object,
      required: true
    }
  },
  setup() {
    const technicians = ref([]);

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
    const viewTechnicianDetails = (id) => {
      console.log('View details for technician with ID:', id);
    };
    loadTechnicians();

    return {
      technicians,
      viewTechnicianDetails,
      redirectToTechnicianProfile
    };
  }
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
  margin: 0 10px 20px;
  box-sizing: border-box;
  background-color: deepskyblue;
  border: 2px solid grey;
  padding: 8px;
  border-radius: 10px;
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