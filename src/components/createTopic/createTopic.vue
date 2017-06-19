<template>
  <div class="createTopic">
    <div class="createTopic-header clearfix">
        <div class="title-name">发表主题界面</div>
    </div>    
    <div class="createTopic-login" v-if="!hasShowNews">
        <router-link to="/login">点击我登录，才能发表自己的想法哦!!</router-link>
    </div>
    <div v-if="hasShowNews">
    <div class="create-title-wrapper">
          <md-input-container>
            <label>请输入你的主题</label>
            <md-input type="text" v-model="title"></md-input>
          </md-input-container>
    </div>
    <md-input-container>
        <label for="topic"></label>
        <md-select name="topic" id="country" v-model="topic" placeholder="请选择要发表的主题">
            <md-option value="share">分享</md-option>
            <md-option value="job">招聘</md-option>
            <md-option value="ask">问答</md-option>
        </md-select>
    </md-input-container>
    <div class="create-content-wrapper">
        <md-input-container>
            <label>请输入你的内容</label>
            <md-textarea v-model="content"></md-textarea>
        </md-input-container>        
    </div>
    <div class="pass-wrapper" @click="pass">
        <md-button class="md-raised md-primary">提交内容</md-button>
    </div>
    <md-dialog-alert
        :md-content="alert.content"
        :md-ok-text="alert.ok"
        @open="onOpen"
        @close="onClose"
        ref="dialog3">
    </md-dialog-alert>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            topic:'',
            title:'',
            content:'',
            alert: {
            content: '主题提交完成',
            ok: '确定'
            }
        }
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
    },
    watch:{
        title() {
            console.log(this.title)
        }
    },
    methods:{
        pass() {
            if(this.title !== '' && this.content !== ''&& this.topic !== ''){
                this.title = '';
                this.content = '';
                this.topic = '';
                this.openDialog()
            }
        },
        onOpen() {
        console.log('Opened');
        },
        onClose(type) {
        console.log('Closed', type);
        },
        openDialog(ref) {
        this.$refs.dialog3.open();
        },
        closeDialog(ref) {
        this.$refs.dialog3.close();
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss'; 
   .createTopic{
       text-align:center;
       .createTopic-header{
           height:50px;
           line-height:50px;
           @include border-1px(#e6e6e6);
           .title-name{
               font-size:18px;
           }
       }
        .createTopic-login{
            display:inline-block;
            margin-top:65%;
            a{
                color:#80bd01;
                font-size:18px;
            }
        }
        .create-title-wrapper{
            height:70px;
            line-height:70px;
            margin-top:10px;
            input{
                width:300px;
                border-radius:3px;
                padding:10px;
            }
        }
        .pass-wrapper{
            margin-top:100px;
        }
   }

</style>
