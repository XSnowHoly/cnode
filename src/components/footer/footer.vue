<template>
    <div class="footer">
        <md-bottom-bar class="barItem-wrapper">
        <div class="wrapper" v-for="(item,index) of list" key="index" @click="toPath(item.path)">
            <md-bottom-bar-item >
                <div class="title-wrapper">    
                    <i class="iconfont" :class="[ item.icon, {'active' : item.path == $route.path }]"></i>
                    <p :class="{'active' : item.path == $route.path }">{{ item.title }}</p>
                    <div class="count" v-if="item.path == '/my/messages ' && count > 0">{{ count }}</div>
                </div>
            </md-bottom-bar-item>
        </div>
        </md-bottom-bar>    
    </div>
</template>

<script>
export default {
    data () {
        return {
            count:0,
            list:[
               {
                   title:'首页',
                   path: '/',
                   icon:'icon-shouye'
               },
               {
                   title:'发表',
                   path:'/topic/create',
                   icon: 'icon-17'
               },
               {
                  title: '消息',
                  path: '/my/messages',
                  icon:'icon-xiaoxi'
               },
               {
                    title: '我的',
                    path: '/my/home',
                    icon: 'icon-iconfontguanyuwo'
               }
            ]
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
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        z-index:50;
        text-align:center;
        border-top:2px solid #e6e6e6;
        height:60px;
        .barItem-wrapper{
            .wrapper{
                .title-wrapper{
                    text-decoration:none;
                    vertical-align:middle;
                    margin-top:5px;
                   i{
                        font-size:24px;
                        width: 24px;
                        min-width: 24px;
                        margin: 0 auto;
                        color:#757575;
                        font-weight:bold;
                        transition: all 0.3s;
                        &.active{
                            color:#2196f3;
                        }
                    }
                    p{
                        font-size:18px;
                        color:#757575;
                        margin-top:5px;
                        &.active{
                            color:#2196f3;
                        }
                    }
                }

            }
        }
    }

</style>

