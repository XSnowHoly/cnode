<template>
  <transition class="move">
    <div class="home">
        <v-header></v-header>
        <div class="content-wrapper" ref="cards">
            <div class="content">
                <div v-if="handleData.length === 0" class="load-wrapper">
                    <md-spinner :md-size="60" md-indeterminate ></md-spinner>
                </div>
                <v-Content :cardData="handleData[index]" v-else v-for="(item,index) of handleData" key="index"></v-Content>
                <div v-if="loading" class="loading">
                    <md-spinner :md-size="40" md-indeterminate ></md-spinner>
                </div>
            </div>    
        </div>
    </div>
  </transition>  
</template>

<script>
import header from '../header/header'
import content from '../content/content'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            data:[],
            page:1,
            loading:false
        }
    },
    components:{
        'v-header':header,
        'v-Content':content
    },
    mounted () {
       this.initData()
    },
    methods :{
        initScroll (){
            this.cardScroll = new BScroll(this.$refs.cards,{
                click:true,
                bounce: true,
                momentumLimitTime:200,
                probeType: 3
            })
            this.cardScroll.on('scroll', (pos) => {
                let cardScroll = Math.abs(this.cardScroll.maxScrollY)+35
                if(Math.abs(pos.y) > cardScroll && !this.loading){
                    this.loading = true;
                    this.refreshScroll()
                    this.getData()
                }
            })
        },
        initData (type,page) {
            let url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=20`
            if(type){
                url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=20&tab=${type}`
            }
            this.$http.get(url).then(res=>{
                if(res.status === 200){
                    let {data} = res.data
                    this.diffData(type,data)
                }
            })
        },
        getData () {
            let page
            let type = this.$route.query.tab;
            let url 
            if(!type){
                page = this.$store.state.allModule.allPage+1
                url = `https://cnodejs.org/api/v1/topics?page=${page}&limit=20`
                this.$store.dispatch('getAllData',{url})
            }
            if(type === 'good'){
                page = this.$store.state.goodModule.goodPage+1
                url = `https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${type}`
                this.$store.dispatch('getGoodData',{url})
            }
            if(type === 'share'){
                page = this.$store.state.shareModule.sharePage+1
                url = `https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${type}`
                this.$store.dispatch('getShareData',{url})
            }
            if(type === 'ask'){
                page = this.$store.state.askModule.askPage+1
                url = `https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${type}`
                this.$store.dispatch('getAskData',{url})
            }
            if(type === 'job'){
                page = this.$store.state.jobModule.jobPage+1
                url = `https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${type}`
                this.$store.dispatch('getJobData',{url})
            }
        },
        refreshScroll () {
            this.$nextTick(()=>{
                if(!this.cardScroll){
                    this.initScroll()
                }else{
                    this.cardScroll.refresh()
                }    
            })
        },
        diffData (type,data) {
            if(!type){
                this.$store.commit('initAllData',data) 
            }
            if(type === 'good'){
                this.$store.commit('initGoodData',data) 
            }
            if(type === 'share'){
                this.$store.commit('initShareData',data) 
            }
            if(type === 'ask'){
                this.$store.commit('initAskData',data) 
            }
            if(type === 'job'){
                this.$store.commit('initJobData',data) 
            }
        }
    },
    computed :{
        handleData () {
            let data 
            let type = this.$route.query.tab
            if(!type){
              data = this.$store.state.allModule.allData 
            }
            if(type === 'good'){
              data = this.$store.state.goodModule.goodData 
            }
            if(type === 'share'){
              data = this.$store.state.shareModule.shareData 
            }
            if(type === 'ask'){
               data = this.$store.state.askModule.askData 
            }
            if(type === 'job'){
                data = this.$store.state.jobModule.jobData 
            }            
            this.refreshScroll()
            this.loading = false
            return data
        }
    },
    watch : {
         '$route' (to,from){
             let type = this.$route.query.tab
             this.initData(type)
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
                margin-top:20%;
            }
            .loading{
                width:100%;
                text-align:center;
            }
        }
    }
</style>