<template>
  <div class="myhome"> 
    <div class="bg-wrapper">
        <img src="../../common/img/galaxy.jpg">
    </div>
    <div class="home-wrapper">
        <div class="flex-wrapper">
            <div class="login-wrapper">
                <div class="avatar-wrapper" v-show="getAvatar"  @click="showUserDetail">
                    <img :src="getAvatar">
                </div>
                <div class="avatar-wrapper" v-show="!getAvatar">
                    <img src="../../common/img/login.jpg" alt="">
                </div>
                <div class="name-wrapper">
                    <h1 class="name">{{getName}}</h1>
                </div>
                <div class="login" v-show="JSON.stringify(getUserData) === '{}'">
                    <div class="" @click="login">登录</div>
                </div>
                <div class="loout login" v-show="JSON.stringify(getUserData) !== '{}'">
                    <div class="" @click="SignOut ">登出</div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-wrapper">
        <div class="new-wrapper clearfix"  @click="readNews">
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
        <div class="new-wrapper clearfix" @click="publicTopic">
            <div class="icon-wrapper icon-wrapper1">
                <i class="iconfont">&#xe65f;</i>
            </div>
            <div class="desc">
                <p >发表主题</p>
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
    <userDetail ref="userDetail" :data="getUserData" v-if="getUserData.success"></userDetail>
  </div>
</template>

<script>
import userDetail from '../userDetail/userDetail'

export default {
  data () {
      return {}
  },
  methods:{
      login() {
          this.$router.push('/login')
      },
      SignOut() {
          this.$store.commit('clearUserData')
      },
      publicTopic() {
          this.$router.push('/topic/create')
      },
      readNews() {
          this.$router.push('/my/messages')
      },
      showUserDetail() {
          this.$refs.userDetail.showDetail()
      }
  },
  computed:{
      getUserData() {
          let data = this.$store.getters.getUserData
          return data
      },
      getAvatar() {
          let {avatar_url} = this.getUserData;
          return avatar_url
      },
      getName() {
          let {loginname} = this.getUserData;
          if(loginname){
             return loginname
          }else{
            return '未知的人类'
          }
      }
  },
  components:{
      userDetail
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
                            border:3px solid #fff;
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
