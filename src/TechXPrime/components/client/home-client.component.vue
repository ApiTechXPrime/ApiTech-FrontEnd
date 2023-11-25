<template>
  <div class="flex justify-content-around mt-6">
    <router-link :to="{path: `/sideBarClient/${this.$route.params.clientId}/technicalView`}">
      <pv-card class="w-25rem h-15rem">
        <template #title>TECHNICAL</template>
        <template #content>
          <i class="pi pi-user text-8xl"></i>
        </template>
      </pv-card>
    </router-link>
    <router-link to="">
      <pv-card class="w-25rem h-15rem bg-black-alpha-10" style="cursor: default">
        <template #title> INBOX </template>
        <template #content>
          <i class="pi pi-envelope text-8xl"></i>
        </template>
      </pv-card>
    </router-link>
  </div>
  <div class="flex justify-content-evenly align-items-end" style="height: 50%;">
    <router-link style="width: 60%" :to="{path: `/sideBarClient/${this.$route.params.clientId}/progress`}">
      <pv-card class="h-15rem">
        <template #title>PROGRESS</template>
        <template #content>
          <i class="pi pi-clock text-8xl"></i>
        </template>
      </pv-card>
    </router-link>
  </div>
</template>

<script>
</script>

<style scoped>
</style>