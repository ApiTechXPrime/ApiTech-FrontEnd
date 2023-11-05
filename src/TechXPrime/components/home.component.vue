<template>
    <div class="flex justify-content-around mt-6">
      <router-link to="/profile">
        <pv-card class="w-25rem h-15rem">
          <template #title>PROFILE</template>
          <template #content>
            <i class="pi pi-user text-8xl"></i>
          </template>
        </pv-card>
      </router-link>
      <router-link to="/inbox">
        <pv-card class="w-25rem h-15rem">
          <template #title> INBOX </template>
          <template #content>
            <i class="pi pi-envelope text-8xl"></i>
          </template>
        </pv-card>
      </router-link>
    </div>
    <div class="flex justify-content-evenly align-items-end" style="height: 50%;">
      <router-link style="width: 60%" to="/dashboard">
        <pv-card class="h-15rem">
          <template #title>DASHBOARD</template>
          <template #content>
            <i class="pi pi-table text-8xl"></i>
          </template>
        </pv-card>
      </router-link>
    </div>
</template>

<script>
</script>

<style scoped>
</style>