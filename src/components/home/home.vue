<template>
  <transition class="move">
    <div class="home">
        <v-header></v-header>
        <div class="content-wrapper" ref="cards">
            <div class="content">
                <div v-if="handleData.length === 0" class="load-wrapper">
                    <md-spinner :md-size="60" md-indeterminate ></md-spinner>
                </div>
                <div v-else v-for="(item,index) of handleData" key="index" @click="selectCard(item)">
                    <v-card :cardData="handleData[index]"></v-card>
                </div>
                <div v-if="loading" class="loading">
                    <md-spinner :md-size="40" md-indeterminate ></md-spinner>
                </div>
            </div>    
        </div>
        <v-cardContent ref="cardContent" :id="selectId"></v-cardContent>
    </div>
  </transition>  
</template>

<script>
import header from '../header/header'
import card from '../card/card'
import BScroll from 'better-scroll'
import cardContent from '../cardContent/cardContent'

export default {
    data() {
        return {
            data:[],
            page:1,
            loading:false,
            selectId:''
        }
    },
    components:{
        'v-header':header,
        'v-card':card,
        'v-cardContent':cardContent
    },
    mounted () {
       this.initData()
    },
    methods :{
        selectCard (item){
            this.selectId = item.id
            this.$refs.cardContent.toggle()
        },
        hasData (type) {
            let hasLength
            if(!type){
                hasLength = this.$store.state.allModule.allData.length
            }
            if(type === 'good'){
                hasLength = this.$store.state.goodModule.goodData.length
            }
            if(type === 'share'){
                hasLength = this.$store.state.shareModule.shareData.length
            }
            if(type === 'job'){
                hasLength = this.$store.state.jobModule.jobData.length
            }
            if(type === 'ask'){
                hasLength = this.$store.state.askModule.askData.length
            }
            let boll = hasLength>0?true:false
            return boll

        },
        initScroll (){
            if(!this.cardScroll){
                this.cardScroll = new BScroll(this.$refs.cards,{
                    click:true,
                    bounce: true,
                    momentumLimitTime:200,
                    probeType: 3
                })
            }else{
                this.cardScroll.refresh()
            }
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
            if(this.hasData(type)){
                this.data = this.$store.state.allModule.allData
            }else{
                let url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=15`
                if(type){
                    url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=15&tab=${type}`
                }
                this.$http.get(url).then(res=>{
                    if(res.status === 200){
                        let {data} = res.data
                        this.diffData(type,data)
                    }
                })
            }
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
            // let data 
            let type = this.$route.query.tab
            if(!type){
              this.data = this.$store.state.allModule.allData 
            }
            if(type === 'good'){
              this.data = this.$store.state.goodModule.goodData 
            }
            if(type === 'share'){
              this.data = this.$store.state.shareModule.shareData 
            }
            if(type === 'ask'){
               this.data = this.$store.state.askModule.askData 
            }
            if(type === 'job'){
                this.data = this.$store.state.jobModule.jobData 
            }            
            this.refreshScroll()
            this.loading = false
            return this.data
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

<style lang="scss" scoped>
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