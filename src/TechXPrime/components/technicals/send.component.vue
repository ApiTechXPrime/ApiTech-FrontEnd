<script>
import{InboxApiService} from "@/TechXPrime/services/inbox-api.service";
import {RequestApiService} from "@/TechXPrime/services/request-api.service";

export default{
  name:'imbox',
  data(){
    return{
      imboxService: null,
      imbox:[],
    }
  },
  methods:{
  },
  created() {
    this.imboxService = new RequestApiService();
    const id = this.$route.params.id;

    this.imboxService.getById(id)
        .then((response) => {
          this.imbox = response.data;
          console.log(this.imbox);
        })
        .catch((error) => {
          console.error('Error al obtener los detalles del cliente:', error);
        });
  }
}
</script>


<template>
  <div class="Inbox">
    <i class="fas fa-inbox"></i> <p>Inbox </p><br><br>

  </div>

  <div class="card">
    <span style="text-align: right;">RESPONDING TO  {{ this.imbox ? this.imbox.name : '' }}</span>
    <pv-card style="margin: 10px; background-color: #007bff; ">
      <template #content>
        <div class="flex gap-2">
          <div class="info">
            <div class="info-item">
              <img src="" alt="">
              <textarea id="comentario" name="comentario" class="info-input" rows="5" cols="60" placeholder="Ingresa tu comentario"></textarea>

            </div>
            <div class="info-item">
              <span class="info-label">Number:</span><input type="text" class="info-value">

            </div>


          </div>
          <div class="button-container">
            <button class="button">SEND</button>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>
<style scoped>
.Inbox{
  display: flex;
  align-items: center
}
.Inbox i {
  margin-right: 10px; /* Ajusta el margen entre el icono y el texto */
}
.button-container {
  width: 25%; /* Ancho del 25% para la columna de botones */
  gap: 20px;
  margin-top: 40px;

}
.button {
  margin-top: 5px; /* Ajusta este valor según tu preferencia para mover los botones hacia abajo */
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
</style>