<template>

  <div class="cards">
    <router-link to="/Technical">
      <div class="fisrt">
        <pv-card style="width: 55em; height:25em">

          <template #title> TECHNICAL  </template>
          <template #subtitle>  </template>
          <template #content>
            <p>
            </p>
          </template>

        </pv-card>
      </div>
    </router-link>
    <router-link to="/Inbox">
      <div class="second">
        <pv-card style="width: 55em; height:25em">

          <template #title> INBOX </template>
          <template #subtitle>  </template>
          <template #content>
            <p>

            </p>
          </template>

        </pv-card>
      </div>

    </router-link>
    <router-link to="/Progress">
      <div class="third">
        <pv-card style="width: 120em; height:30em">

          <template #title> PROGRESS </template>
          <template #subtitle>  </template>
          <template #content>
            <p>
            </p>
          </template>

        </pv-card>
      </div>
    </router-link>

  </div>



</template>

<script>



</script>

<style scoped>
.fisrt {
  position: absolute;

  left: 540px ;

  top: 200px;
  margin: 0px;
  padding: 0px;

  border: 2px solid black;

}

.second {
  position: absolute;

  left: 1550px ;

  top: 200px;
  margin: 0px;
  padding: 0px;
  border: 2px solid black;

}

.third {
  position: absolute;

  left: 530px ;

  top: 700px;
  margin: 0px;
  padding: 0px;
  border: 2px solid black;


}


</style>