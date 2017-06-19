<template>
  <div class="myNews">
    <div class="myNews-header clearfix">
        <div class="title-name">用户消息</div>
    </div>    
    <div class="news-login" v-if="!hasShowNews">
        <router-link to="/login">点击我登录，然后查看信息</router-link>
    </div>
    <div class="news-content" v-if="hasShowNews">
       <div class="news">
            <p>连一颗尘都没有。。。</p>
       </div>
       <div class="nonews-img">
            <img src="../../common/img/no-news.gif" alt="">
       </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {}
    },
    methods:{

    },
    computed:{
      getUserData() {
          return this.$store.getters.getUserData
      },
      hasShowNews() {
          let {loginname} = this.getUserData
          if(!loginname){
              return false
          }else{
              return true
          }
      }        
    }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss'; 
  .myNews{
    .myNews-header{
        background:#fff;
        text-align:center;
        height:50px;
        line-height:50px;
        @include border-1px(#e6e6e6);
        .title-name{
            font-size:18px; 
        }
    }
    .news-login{
        text-align:center;
        position:fixed;
        top:45%;
        left:25%;
        a{
            color:#80bd01;
            font-size:18px;
        }
    }
    .news-content{
        position:fixed;
        top:25%;
        left:20%;
        .news{
            text-align:center;
            padding-bottom:10px;
            p{
                font-size:20px;
                font-weight:bold;
            }
        }
        .nonews-img{
            img{
                width:230px;
                height:230px;
                border-radius:7px;
            }
        }
    }
  }

</style>
