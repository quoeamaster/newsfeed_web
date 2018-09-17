<template>
  <div id="app">
    <!-- HelloWorld msg="###Welcome***"/ -->
    <LoginVue></LoginVue>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LoginVue from './components/Login.vue'

export default {
  name: 'app',
  components: {
    LoginVue
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
