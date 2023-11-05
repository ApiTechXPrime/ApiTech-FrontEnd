<script>
import {InboxApiService} from "@/Inbox/services/inbox-api.service";

export default{
  name:'imbox',
  data(){
    return{
      imboxService: null,
      imboxs:[],
    }
  },
  methods:{
  },
  created(){
    this.imboxService = new InboxApiService()
    this.imboxService.getClients()
        .then((response) => this.imboxs = response.data)
    console.log(this.imboxs)
  }
}
</script>

<template>
  <div class="card">
    <pv-card v-for="imbox in imboxs" :data="imbox" style="margin: 120px; background-color: #007bff; min-width: 100px;">
      <template #content>
        <div class="flex gap-2">
          <div class="info">
            <div class="info-item">
              <span class="info-label">Name:</span>
              <span class="info-value">{{ imbox.fullName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Number:</span>
              <span class="info-value">{{ imbox.Number }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Cellphone:</span>
              <span class="info-value">{{ imbox.Cellphone }}</span>

            </div>
            <div class="info-item">
              <span class="info-label">Problem:</span>
              <span class="info-value">{{ imbox.Problem }}</span>

            </div>
            <div class="info-item">
              <span class="info-label">Time:</span>
              <span class="info-value">{{ imbox.Time }}</span>
            </div>

          </div>
          <div class="button-container">
            <router-link :to="{ name: 'Send', params: { id: imbox.id } }" active-class="active" exact tag="button" class="button side-btn">ACCEPT</router-link>
            <!-- <button class="button">ACCEPT</button> -->
            <button class="button">DENY</button>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 0px;
}
a.button {
  text-decoration: none;
}
.button-container {
  width: 50%; /* Ancho del 25% para la columna de botones */
  gap: 20px;
  margin-top: 40px;

}
.button {
  margin-top: 15px; /* Ajusta este valor según tu preferencia para mover los botones hacia abajo */
  border-radius: 20%; /* Hace que los botones sean medios circulares */
  padding: 8px 12px; /* Ajusta el relleno según tus preferencias */
  background-color: #007bff; /* Color de fondo */
  color: #fff; /* Color del texto */
  border: 2px solid #054b96; /* Elimina el borde */
  cursor: pointer;
  margin-right: 10px;
}
.button:last-child {
  margin-right: 0; /* Elimina el margen derecho del último botón para evitar espacio adicional */
}
.button:hover {
  background-color: #0056b3; /* Cambia el color de fondo al pasar el cursor sobre el botón */
}

.button-primary {
  background-color: #007bff; /* Estilo para el botón "ACCEPT" */
}

.button-danger {
  background-color: #3543dc; /* Estilo para el botón "DENY" */
}
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
}

.info-label {
  font-weight: bold;

}

.info-value {
  flex-grow: 1;
  text-align: left;
}
.info-value:last-child {
  margin-bottom: 0; /* Elimina el margen inferior para el último elemento info-value */
}
</style>