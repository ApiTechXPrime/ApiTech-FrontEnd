<script>
export default{
  data(){
    return{
      items:[
        {label:"Login", to:"/login"},
        {label:"Register", to:"/register"},
      ]
    }
  }
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
