<template>
  <form>
    <div class="name">
      <label class="name" for="name">Name </label><br>
      <input type="text" placeholder="please enter a name" id="name" v-model="formData.name">
    </div>
    <div class="number">
      <label for="number">Number</label><br>
      <input type="text" id="number" v-model="formData.number">
    </div>
    <div class="day">
      <label for="day">Date</label><br>
      <input type="date" id="day" v-model="formData.day">
    </div>
    <div class="hour">
      <label for="hour">Hour</label><br>
      <input type="time" id="hour" v-model="formData.hour">
    </div>
    <div class="cellphone">
      <label for="cellphone">Cellphone</label><br>
      <input type="text" id="cellphone" v-model="formData.cellphone">
    </div>
    <div class="Problem">
      <label for="Problem">Problem</label><br>
      <select class="form-select form-select-sm" id="Problem" v-model="formData.problem">
        <option value="battery">battery</option>
        <option value="screen">screen</option>
        <option value="virus">virus</option>
        <option value="other">other</option>
      </select>
    </div>
    <div class="Specification">
      <span>Specification:</span>
      <br>
      <textarea v-model="formData.specification" placeholder="agregar múltiples líneas"></textarea>
    </div>
    <div class="a">
      <button @click="sendRequest">Send Request</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        number: '',
        day: '',
        hour: '',
        cellphone: '',
        problem: 'battery',
        specification: ''
      }
    };
  },
  methods: {
    sendRequest() {
      //
      console.log(this.formData);
      //
    }
  }
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