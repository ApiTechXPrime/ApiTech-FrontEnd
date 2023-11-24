<template>
  <div>
    <div class="prof-fa-use">

      <div class="flex card justify-content-center" style="height: 470px; width: 90%;">
        <div class="pv-card" v-for="technician in technicians" :key="technician.id" @click="redirectToTechnicianProfile(technician.id)">
          <div class="pv-card">
            <div class="technician-details">
              <img :src="technician.image" alt="Técnico" class="technician-image" />
              <div class="details">
                <h2>{{ technician.fullName }}</h2>
                <p><strong>Qualification:</strong> {{ technician.qualification }}</p>
                <p><strong>Location:</strong> {{ technician.location }}</p>
                <p><strong>Consultation Price:</strong> {{ technician.consultationPrice }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { ListTechnicalApiService } from "@/TechXPrime/services/list-technical.api.service";

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

    loadTechnicians();

    return {
      technicians,
      redirectToTechnicianProfile
    };
  }
};
</script>

<style scoped>
.pv-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: #f9f9f9;
  width: 300px;

}

.technician-details {
  display: flex;
  align-items: center;
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