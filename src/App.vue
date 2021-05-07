<template>
  <div id="app">
    <div class="container">
      <HelloWorld />
    </div>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(25, 89, 207);
}

.container{
  width: 85vw;
  height: 85vh;
  background-color: white;
  border-radius: 10px;
}
</style>
