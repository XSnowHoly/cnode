<template>
  <div id="app">
    <c-footer></c-footer>
  </div>
</template>

<script>
import footer from './components/footer/footer'

export default {
  name: 'app',
  components:{
    'c-footer':footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
