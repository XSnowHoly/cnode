<template>
    <div class="footer">
        <md-bottom-bar class="barItem-wrapper" >
            <md-bottom-bar-item  class="wrapper" v-for="item of list">
                <router-link :to="item.path">    
                    <i class="iconfont" :class="[ item.icon, {'active' : item.path == $route.path }]" ></i>
                    <p :class="{'active' : item.path == $route.path }">{{ item.title }}</p>
                    <div class="count" v-if="item.path == '/my/messages ' && count > 0">{{ count }}</div>
                </router-link>
            </md-bottom-bar-item>
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
    }
}
</script>

<style lang="scss">
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        z-index:50;
        text-align:center;
        .barItem-wrapper{
            .wrapper{
                a{
                    text-decoration:none;
                    vertical-align:middle;
                    margin-top:5px;
                   i{
                        font-size:24px;
                        width: 24px;
                        min-width: 24px;
                        height: 24px;
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

