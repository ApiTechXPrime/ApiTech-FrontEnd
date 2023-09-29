<script >
import Sidebar from '../components/Sidebar.vue'
export default {
  name:'Home',

  components:{
    Sidebar
  }
}
</script>

<template>
  <div class="home">
    <Sidebar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
.home{
  display:grid;
  grid-template-columns:1fr 5fr;
  background-color:#448AFF;
  height: 100vh;
  width:100vw;
}
.content{
  background-color:white;
  border-radius: 20px;
  margin:6px 6px 6px 0px;
}
</style>
