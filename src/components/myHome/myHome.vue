<template>
  <div class="myhome"> 
    <div class="bg-wrapper">
        <img src="../../common/img/galaxy.jpg">
    </div>
    <div class="home-wrapper">
        <div class="flex-wrapper">
            <div class="login-wrapper">
                <div class="avatar-wrapper">
                    <img src="../../common/img/login.jpg">
                </div>
                <div class="name-wrapper">
                    <h1 class="name">未知的人类</h1>
                </div>
                <div class="login">
                    <div class="" @click="test">登录</div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-wrapper">
        <div class="new-wrapper clearfix">
            <div class="icon-wrapper icon-wrapper1">
                <i class="iconfont">&#xe60d;</i>
            </div>
            <div class="desc">
                <p>我的消息</p>
            </div>
            <div class="icon-wrapper icon-wrapper2">
                <i class="iconfont">&#xe688;</i>
            </div>
        </div>
        <div class="new-wrapper clearfix">
            <div class="icon-wrapper icon-wrapper1">
                <i class="iconfont">&#xe65f;</i>
            </div>
            <div class="desc">
                <p>发表主题</p>
            </div>
            <div class="icon-wrapper icon-wrapper2">
                <i class="iconfont">&#xe688;</i>
            </div>
        </div>
        <div class="break"></div>    
        <div class="new-wrapper clearfix">
            <div class="icon-wrapper icon-wrapper1">
                <i class="iconfont">&#xe655;</i>
            </div>
            <div class="desc">
                <p>关于</p>
            </div>
            <div class="icon-wrapper icon-wrapper2">
                <i class="iconfont">&#xe688;</i>
            </div>
        </div>            
    </div>
  </div>
</template>

<script>

export default {
  data () {
      return {}
  },
  methods:{
      test() {
          this.$router.push('/login')
      }
  }
}
</script>

<style lang="scss" scoped>
    .myhome{
        position:relative;
        .bg-wrapper{
            position:absolute;
            width:100%;
            height:560px;
            top:0;
            left:0;
            z-index:-1;
            img{
                height:100%;
                width:100%;
            }
        }
        .home-wrapper{
            width:100%;
            height:250px;
            position:relative;
            display:flex;
            justify-content: center;
            align-items:center;
            .flex-wrapper{
                .login-wrapper{
                    .avatar-wrapper{
                        width:80px;
                        margin: 0 auto;
                        img{
                            width:80px;
                            height:80px;
                            border-radius:50%;
                        }
                    }
                    .name-wrapper{
                        text-align:center;
                        padding: 10px 0;
                        .name{
                            font-size:20px;
                            color:#fff;
                        }
                    }
                    .login{
                        border:1px solid #fff;
                        text-align:center;
                        margin:0 auto;
                        margin-top:10px;
                        width:300px;
                        border-radius:35px;
                        div{
                            background-color:rgba(139,180,192,0.3);
                            color:#fff;
                            padding:6px 0;
                            border-radius:35px;
                        }
                    }                                
                }
            }
        }
        .set-wrapper{
            width:100%;
            height:360px;
            background:#fff;
            .new-wrapper{
                padding-top:5px;
                border-top:1px solid #e6e6e6;
                border-bottom:1px solid #e6e6e6;
                .icon-wrapper{
                    display:inline-block;
                    padding-left:10px;
                    i{
                        font-weight:bold;
                        color:gray;
                        font-size:20px;
                    }
                }
                .icon-wrapper2{
                    float:right;
                    padding:12px 10px 0 0;
                }
                .desc{
                     display:inline-block;
                }
            }
            .break{
                height:50px;
            }
        }
    }

</style>
