<template>
  <transition class="move">
    <div class="home">
        <v-header></v-header>
    </div>
  </transition>  
</template>

<script>
import header from '../header/header'

export default {
    data() {
        return {}
    },
    components:{
        'v-header':header
    }
}
</script>

<style lang="scss" scoped>
    .home{
        position:absolute;
        bottom:65px;
        top:0;
        width:100%;
        overflow:hidden;
    }
</style>