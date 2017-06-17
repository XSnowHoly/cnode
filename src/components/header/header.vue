<template>
    <div class="header">
    <md-bottom-bar class="bar" >
        <div  v-for="(item,index) of list" key="index" class="bar-item" @click="toPath(item.path)">
            <div class="item">
                <md-bottom-bar-item>
                    <div class="title-wrapper">    
                        <p :class="{'active' : item.tab == dealActive }">{{ item.title }}</p>
                    </div>
                </md-bottom-bar-item>
            </div>
        </div>
    </md-bottom-bar>
    </div>
</template>

<script>

export default {
    data() {
        return {
            list:[
               {
                   title:'全部',
                   path: '/',
                   tab:'/'
               },
               {
                   title:'精华',
                   path:'/?tab=good',
                   tab:'good'
               },
               {
                  title: '分享',
                  path: '/?tab=share',
                  tab:'share'
               },
               {
                    title: '问答',
                    path: '/?tab=ask',
                    tab:'ask'
               },
               {
                    title: '招聘',
                    path: '/?tab=job',
                    tab:'job'
               }
            ]
        }
    },
    computed :{
        dealActive () {
            if(!this.$route.query.tab){
                return '/'
            }else{
                return this.$route.query.tab
            }
        }
    },
    methods:{
        toPath (path){
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss'; 

    .header{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        @include border-1px(#e6e6e6);
        .bar{
            .bar-item{
                .title-wrapper{
                    display:inline-block;
                    text-decoration:none;
                    padding:10px;
                    p{
                        color:gray;
                        padding:5px 0;
                        transition:all 0.2s;
                        font-size:18px;
                        &.active{
                            color:black;
                            display:relative;
                            &::after{
                                content:'';
                                display:block;
                                width:60px;
                                height:2px;
                                background:#ff8201;
                                border-radius:2px;
                                position:absolute;
                                top:55px;
                                left:-2px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
