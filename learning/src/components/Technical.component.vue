<script setup>
import axios from "axios";

const data = {
  technicals: [],
  searchQuery: '',
  showTechnicians: true,
};

const computed = {
  filteredTechnicians() {
    return data.technicals.filter((technician) =>
        technicals.fullName.toLowerCase().includes(data.searchQuery.toLowerCase())
    );
  },
};

const methods = {
  toggleTechnicians() {
    data.showTechnicians = !data.showTechnicians;
  },
  getTechnicianImage(id) {
    const randomImageNumber = Math.floor(Math.random() * 4) + 3;
    return `./img/tec${randomImageNumber}.jpg`;
  },
  loadTechnicians() {
    axios
        .get('https://my-json-server.typicode.com/ApiTechXPrime/dataApiTech')
        .then((response) => {
          data.technicals = response.data;
        })
        .catch((error) => {
          console.error('Error loading data:', error);
        });
  },
};

const mounted = () => {
  methods.loadTechnicians();
};
</script>


<template>
  <div class="card">
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search for technician" />
      <button @click="toggleTechnicians">{{ showTechnicians ? 'Hide Technicians' : 'Show Technicians' }}
          </button>
    </div>
    <pv-card class="form">
        <!-- Lista de técnicos -->
        <div class="technician-list">
          <div v-for="technician in filteredTechnicians" :key="technicals.id" class="technician-card">
            <h1>{{ technicals.fullName }}</h1>
            <img :src="getTechnicianImage(technician.id)" alt="Technician's Photo" />
            <div class="technician-info">
              <p><strong>Experience:</strong> {{ technicals.experience }}</p>
              <p><strong>Qualification:</strong> {{ technicals.qualification }}</p>
              <p><strong>Location:</strong> {{ technicals.Location }}</p>
              <p><strong>About him:</strong> {{ technicals['About he'] }}</p>
            </div>
          </div>
        </div>
    </pv-card>
  </div>
</template>

<style scoped>
.technician {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.technician-list {
  display: flex;
  flex-wrap: wrap;
}

.technician-card {
  width: calc(50% - 20px);
  margin: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.technician-info {
  font-size: 14px;
}
</style>