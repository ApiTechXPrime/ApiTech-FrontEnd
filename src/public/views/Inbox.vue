<script setup>
import inbox from "/src/TechXPrime/components/technicals/inbox.component.vue"
</script>

<template>
  <div class="Inbox">
    <i class="fas fa-inbox"></i> <p>Inbox </p>
  </div>
  <inbox></inbox>
</template>
<style scoped>
.Inbox{
  display: flex;
  align-items: center
}
.Inbox i {
  margin-right: 10px; /* Ajusta el margen entre el icono y el texto */
}
</style>