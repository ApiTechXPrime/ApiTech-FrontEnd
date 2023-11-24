<script setup>

import request from  "/src/TechXPrime/components/client/request.component.vue"
</script>

<template>
  <div class="request">
    <i class="fas fa-inbox"></i> <p>request </p>
  </div>
  <request></request>
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