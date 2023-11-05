<script>
import {TechnicalApiService} from "@/services/technical-api.service";

export default{
  name:'technical',
  data(){
    return{
      technicalService: null,
      technicals:[],
    }
  },
  methods:{
  },
  created(){
    this.technicalService = new TechnicalApiService()
    this.technicalService.getTechnicals()
        .then((response) => this.technicals = response.data)
    console.log(this.technicals)
  }
}
</script>

<template>
  <div class="card">
    <pv-card v-for="technical in technicals" :data="technical" style="margin:10px; background-color: #007bff;">
      <template #content>
        <div class="flex gap-2">
          <div>
            <pv-image :src="technical.image" alt="Imagen del técnico" width="100" height="100"/>
          </div>
          <div>
            {{ technical.fullName }}<br>
            {{ technical.experience }}<br>
            {{ technical.location }}<br>
            {{ technical.qualification }}<br>
            {{ technical.aboutHim }}
          </div>
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>
</style>
