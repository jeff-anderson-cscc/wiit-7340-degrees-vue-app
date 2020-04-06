<template>
  <div class="container">
    <div id="app">
      <NavBar/>
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>

<style>
</style>

<script>
  import Footer from "./components/Footer";
  import NavBar from "./views/NavBar";
  export default {
    components: {NavBar, Footer}
  }
</script>