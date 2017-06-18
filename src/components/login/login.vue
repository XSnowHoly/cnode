<template>
  <div class="login">
    <div class="login-header clearfix">
        <div class="icon-wrapper" @click="back">
            <i class="iconfont">&#xe600;</i>
        </div>
        <span>登录界面</span>
    </div>
    <div class="login-body">
        <div class="login-box">
            <div class="input-box">
                <md-input-container>
                    <label>accessToken</label>
                    <md-input maxlength="40" v-model="token"></md-input>
                </md-input-container>
            </div>
            <div class="login-btn">
                <button class="btn" @click="login">登录</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
      return {
          token:'',
          data:{}
      }
  },
  methods: {
      login() { 
        this.$store.dispatch('loginUser',{accesstoken: `${this.token}`}).then((data)=>{
            this.token = ''
        })

      },
      back() {
          this.$router.push('/my/home')
      }
  },
  computed:{
    userState() {
        this.data = this.$store.state.userModule.userData
        return this.data
    }
  },
  watch:{
      data() {
          console.log('w')
      }
  }
}
</script>

<style lang="scss" scoped>
    .login{
        .login-header{
            padding:10px 0;
            border-top:1px solid #e6e6e6;
            border-bottom:1px solid #e6e6e6;
            text-align:center;
            .icon-wrapper{
                float:left;
                i{
                    padding-left:10px;
                    font-size:20px;
                }
            }
            span{
                display:inline-block;
                font-size:18px;
                margin-right:15px;
            }
        }
        .login-body{
            width:100%;
            height:563px;
            background-image: linear-gradient(to bottom, #315481, #918e82 100%);
            display:flex;
            justify-content:center;
            align-items:center;
            .login-box{
                width:300px;
                height:150px;
                border:1px solid #fff;
                background:#fff;
                border-radius:3px;
                transition:all .5s;
                &:hover{
                     box-shadow:3px 3px 5px #fff;
                }
                .input-box{
                    text-align:center;
                    padding:10px;
                    border-radius:10px;
                    input{
                        box-sizing: border-box;
                        width: 100%;
                        padding: 5px 10px;
                        line-height: 28px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        font-size: 14px;
                    }
                }
                .login-btn{
                     padding:10px;
                    .btn{
                        width: 100%;
                        line-height: 38px;
                        border-radius: 5px;
                        border: 1px solid #76ae01;
                        font-size: 14px;
                        color: #fff;
                        background: #80bd01;                        
                    }
                }
            }
        }
    }
</style>
