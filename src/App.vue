<template>
  <div id="app">
    <router-view></router-view>
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


</style>
