<template>
    <transition name="move">
        
    </transition>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
      return {
          show:false,
          cardData:{},
          loading:true,
      }
  },
  props:{
    id:{
        type:String
    }
  },
  methods:{
    toggle () {
        this.show = !this.show
    },
    initScroll () {
        if(!this.contentScroll){
            this.contentScroll = new BScroll(this.$refs.content,{
                click:true,
                bounce: true,
                momentumLimitTime:200,
                probeType: 3
            })
        }else{
            this.contentScroll.refresh()
        }        
    },
    getIdData () {
        this.loading = true
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.id}`).then(res=>{
            if(res.status === 200){
               let { data } = res.data;
               this.cardData = data;
               console.log(this.cardData)
               this.loading = false
               this.$nextTick(()=>{
                    this.initScroll()
               })
            }
        })
    }
  },
  watch : {
      id () {
        this.getIdData();
      }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss'; 

</style>
