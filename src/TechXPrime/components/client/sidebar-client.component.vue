<script>
export default {
}
</script>

<template>
  <div class="home">
    <div class="sidebar">
      <div class="title">
        Menu
      </div>
      <div class="menu-items">
        <router-link to="/sideBarClient/homeClient" active-class="active" exact tag="button" class="side-btn">
          <div class="link-container">
            <i class="pi pi-home"></i>
            Home
          </div>
        </router-link>
        <router-link to="/sideBarClient/technical" active-class="active" exact tag="button" class="side-btn">
          <div class="link-container">
            <i class="pi pi-user"></i>
            Technical
          </div>
        </router-link>
        <router-link to="/sideBarClient/progress" active-class="active" exact tag="button" class="side-btn">
          <div class="link-container">
            <i class="pi pi-clock"></i>
            Progress
          </div>
        </router-link>
        <router-link
            :to="{ path: '/sideBarClient/favorite' }"
            exact
            tag="button"
            class="side-btn favorite-link disabled-link"
            aria-disabled="true"
            :style="{ color: 'gray', cursor: 'default', pointerEvents: 'none' }"
        >
          <div class="link-container">
            <i class="pi pi-star"></i>
            Favorite
          </div>
        </router-link>
        <router-link
            :to="{ path: '/sideBarClient/inbox' }"
            exact
            tag="button"
            class="side-btn"
            :style="{ color: 'gray', cursor: 'default', pointerEvents: 'none' }"
        >
          <div class="link-container">
            <i class="pi pi-envelope"></i>
            Inbox
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
    <div class="content">
      <router-view name="inside"/>
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
  overflow-y: auto
}
</style>