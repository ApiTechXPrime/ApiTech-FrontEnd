<script setup>
import technicians from "/src/TechXPrime/components/client/list-technical.component.vue"
</script>

<template>
  <div class="request">
    <i class="fas fa-inbox"></i> <p>request </p>
  </div>
  <technicians></technicians>
</template>
<style scoped>
.request{
  display: flex;
  align-items: center
}
.request i {
  margin-right: 10px; /* Ajusta el margen entre el icono y el texto */
}
</style>