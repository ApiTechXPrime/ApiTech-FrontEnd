<script setup>

</script>

<template>
<div class="sidebar">
  <div class="title">
    Menu
  </div>
  <div class="menu-items">
    <router-link to="/home" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-home"></i>
        Home
      </div>
    </router-link>
    <router-link to="/Technical" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-user"></i>
        Profile
      </div>
    </router-link>
    <router-link to="/Progress" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-calculator"></i>
        Task
      </div>
    </router-link>
    <router-link to="/Progress" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-table"></i>
        Dashboard
      </div>
    </router-link>
    <router-link to="/Favorite" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-envelope"></i>
        Petition
      </div>
    </router-link>
    <router-link to="/login" active-class="active" exact tag="button" class="side-btn">
      <div class="link-container">
        <i class="pi pi-sign-out"></i>
        Log Out
      </div>
    </router-link>
  </div>
</div>
</template>

<style scoped>
.title{
  color:black;
  font-size:24px;
  margin-top:10px;
}

.menu-items{
    display:flex;
  flex-direction:column;
  margin-top:20px;
}
.menu-items > *{
  margin-top:50px;
  text-decoration:none;
  color: #333232;


}
.side-btn:focus{
  outline:none;
  text-decoration:none;

}
.side-btn.active{
  background-color: white;
  color:black;
  font-weight:500;
}
.side-btn.active::before{
  position:absolute;
  top:-30px;
  right:0;
  height:30px;
  width:30px;
  background-color:white;

}
.side-btn{
  border:none;
  padding:10px 0px;
  cursor:pointer;
  font-size:16px;
  background-color:transparent;
}
</style>