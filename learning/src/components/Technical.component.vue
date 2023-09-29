<script setup>
import axios from "axios";


const data = {
  technicians: [],
  searchQuery: "",
  showTechnicians: true,
};

const computed = {
  filteredTechnicians() {
    return data.technicians.filter((technician) =>
        technician.fullName.toLowerCase().includes(data.searchQuery.toLowerCase())
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
          data.technicians = response.data;
        })
        .catch((error) => {
          console.error("Error loading data:", error);
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
      <button @click="toggleTechnicians">{{ showTechnicians ? 'Hide Technicians' : 'Show Technicians' }}</button>
    </div>
    <div class="person1" >
      <img src="./img/tec1.jpg">
      <div class="dat">
        <label class="name">Javier Dominguez</label> <br>
        <label class="expe">Experience: 1 - 2 years</label><br>
        <label class="loca">Location: Av. Marina LT20</label><br>
        <label class="qual">Qualification: ⭐⭐⭐⭐</label>
        <label class="abo">AboutHim: Gentle</label>
      </div>
    </div>
    <div class="person2" >
      <img src="./img/tec2.jpg">
      <label class="name">Lucas Hernadez</label> <br>
      <label class="expe">Experience: 6 months</label> <br>
      <label class="loca">Location: Calle Herrera LT21</label>
      <label class="qual">Qualification: ⭐⭐✩✩✩</label>
      <label class="abo">AboutHim: Calm, Gentle</label>
    </div>
    <div class="person3">
      <img src="./img/tec3.jpg">
      <label class="name">Mauricio Salas</label>
      <label class="expe">Experience: 3 years</label>
      <label class="loca">Location: Av. Marina LT26</label>
      <label class="qual">Qualification: ⭐⭐⭐⭐✩</label>
      <label class="abo">AboutHim: competent, skilled, Expert</label>
    </div>
    <div class="person4">
      <img src="./img/tec4.jpg">
      <label  class="name">Maria Lobdosky</label>
      <label class="expe">Experience: 2 years</label>
      <label class="loca">Location: Calle Intisuyo LT12</label>
      <label class="qual">Qualification: ⭐⭐⭐✩✩</label>
      <label class="abo">AboutHim": professional, diligent, efficient</label>
    </div>
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

.technician-list-container {
  overflow: hidden;
}

.technician-list {
  display: flex;
  flex-wrap: wrap;
  transition: all 0.5s;
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

.person1 {
  display: flex;
  background-color: #007bff;
  padding: 10px;
  align-items: center;
  margin: 10px;
}

.person2 {
  display: flex;
  background-color: #007bff;
  padding: 10px;
  align-items: center;
  margin: 10px;
}

.person3 {
  display: flex;
  background-color: #007bff;
  padding: 10px;
  align-items: center;
  margin: 10px;
}
.person4 {
  display: flex;
  background-color: #007bff;
  padding: 10px;
  align-items: center;
  margin: 10px;
}

img {
  width: 170px;
  height: auto;
}

.dat {
  margin-left: 10px;
}

.name,
.expe,
.loca,
.qual,
.abo{
  display: block;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
