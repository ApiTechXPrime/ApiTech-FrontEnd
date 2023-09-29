<template>
    <div>
      <h1>🔧 Request</h1>
      <img src="./tec.jpg" alt="TecXPrime">
      <h2>Request sent successfully !!</h2>
      <button class="return-button" @click="returnHome">RETURN HOME</button>
    </div>
</template>

<script>
export default {
  methods: {
    returnHome() {
      this.$router.push({ path: '/home' });
    }
  }
};
</script>

<style >

h1 {
  font-size: 25px;
  color: black;
  margin-top: 1%;
  margin-left: 20%;
}

img {
  width: 13%;
  height: auto;
  position: fixed;
  top: 30%;
  right: 46%;
}

h2{
  font-size: 25px;
  position: fixed;
  top: 50%;
  right: 44%;
}
.return-button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size:18px;
  position: fixed;
  top: 60%;
  right: 48%;
  font-weight: bold;
}

.return-button:hover {
  background-color: #0056b3;
}
</style>
