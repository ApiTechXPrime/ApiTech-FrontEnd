<template>
    <div class="flex justify-content-around mt-6">
      <router-link to="/Technical">
        <pv-card class="w-25rem h-15rem">
          <template #title>TECHNICAL</template>
          <template #subtitle></template>
        </pv-card>
      </router-link>
      <router-link to="/Inbox">
        <pv-card class="w-25rem h-15rem">
          <template #title> INBOX </template>
          <template #subtitle>  </template>
        </pv-card>
      </router-link>
    </div>
    <div class="flex justify-content-evenly align-items-end" style="height: 50%;">
      <router-link style="width: 70%" to="/Progress">
        <pv-card class="h-15rem">
          <template #title>PROGRESS</template>
          <template #subtitle>  </template>
        </pv-card>
      </router-link>
    </div>
</template>

<script>
</script>

<style scoped>
</style>