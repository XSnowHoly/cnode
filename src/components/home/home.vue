<template>
  <transition class="move">
    <div class="home">
        <v-header></v-header>
        <div class="content-wrapper" ref="cards" @click="test">
            <div class="content">
                <div v-if="data.length === 0" class="load-wrapper">
                    <md-spinner :md-size="60" md-indeterminate ></md-spinner>
                </div>
                <v-Content :cardData="data[index]" v-else v-for="(item,index) of data" key="index"></v-Content>
            </div>    
        </div>
    </div>
  </transition>  
</template>

<script>
import header from '../header/header'
import Content from '../Content/Content'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            data:[]
        }
    },
    components:{
        'v-header':header,
        'v-Content':Content
    },
    mounted () {
       this.$http.get('https://cnodejs.org/api/v1/topics').then(obj=>{
           if(obj.status === 200){
               setTimeout(()=>{
                   this.data = obj.data.data;
                   this.$nextTick(()=>{
                       this.initScroll()
                   })
               },1300)
           }
       })
    },
    methods :{
        test () {
            console.log(this.$refs.cards)
        },
        initScroll (){
            this.cardScroll = new BScroll(this.$refs.cards,{
                click:true,
                bounce: true,
                momentumLimitTime:200
            })
        }
    }
}
</script>

<style lang="scss" >
    .home{
        position:fixed;
        bottom:65px;
        top:0;
        width:100%;
        .content-wrapper{
            position:absolute;
            top:67px;
            left:0;
            bottom:-5px;
            width:100%;
            background:#eee;
            overflow:hidden;
            .load-wrapper{
                text-align:center;
                margin-top:60%;
            }
        }
    }
</style>