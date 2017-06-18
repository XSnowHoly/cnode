<template>
  <div id="app">
  <transition name="move"> 
    <router-view class="view"></router-view>
  </transition>  
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

<style lang="scss" scoped>
  .view{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        padding-bottom:20px;
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active{
            transition: all .2s linear;
        }
        &.move-enter, &.move-leave-active{
            transform: translate3d(100%, 0, 0); 
        }        
  }    

</style>
