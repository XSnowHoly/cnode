<template>
    <transition name="move">
        <div class="cardContent" v-show="show">
            <div class="cardContent-header">
                <div class="icon-wrapper" @click="toggle">
                    <i class="iconfont">&#xe600;</i>
                </div>
                <div class="word-wrapper">
                    <p class="word">主题</p>
                </div>
            </div>
            <div class="content-wrapper" v-show="!loading" ref="content">
                <div class="content" >
                    <div class="public-wrapper" v-if="cardData.author">
                        <div class="avatar-wrapper">
                            <img :src="cardData.author.avatar_url">
                        </div>
                        <div class="name-wrapper">
                            <h2 class="name">{{cardData.author.loginname}}</h2>
                        </div>
                        <div class="time-wrapper">
                            <span class="time">{{createTime}}</span>
                        </div>
                        <div class="person-title">
                            <span class="title">#楼主</span>
                        </div>
                    </div>
                    <div class="title-wrapper" v-if="cardData.title">
                        <h1 class="title">{{cardData.title}}</h1>
                        <div class="readcount-wrapper">
                            <i class="iconfont">&#xe681;</i>
                            <span class="readcount">{{cardData.visit_count}}</span>
                        </div>
                        <div class="replycount-wrapper">
                            <i class="iconfont">&#xe606;</i>
                            <span class="replycount">{{cardData.reply_count}}</span>
                        </div>
                    </div>
                    <div v-html="cardData.content" class="html-wrapper"></div>
                </div>
            </div>
            <div class="load-wrapper" v-show="loading">
                <md-spinner :md-size="70" md-indeterminate ></md-spinner>
                <p>Loading...</p>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
      return {
          show:false,
          cardData:{},
          loading:true,
      }
  },
  props:{
    id:{
        type:String
    }
  },
  methods:{
    toggle () {
        this.show = !this.show
    },
    initScroll () {
        if(this.$refs.content){
            if(!this.contentScroll){
                this.contentScroll = new BScroll(this.$refs.content,{
                    click:true,
                    bounce: true,
                    momentumLimitTime:200,
                    probeType: 3
                })
            }else{
                this.contentScroll.refresh()
            }
        } 
    },
    getIdData () {
        this.loading = true
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.id}`).then(res=>{
            if(res.status === 200){
               let { data } = res.data;
               this.cardData = data;
               console.log(this.cardData)
               this.loading = false
               this.$nextTick(()=>{
                    this.initScroll()
              })               
            }
        })
    },
    diffTime (time) {
        let result = time/3000/1000/24/30;
        if(result<1){
            result = Math.ceil(result*30)//当日期小于一个月时，一日表示
            return (result+'日前')
        }
        if( result>1 && result < 12){
            return (Math.ceil(result)+'月前')//表示月
        }else{
            return (Math.ceil(result/12)+'年前')//表示年
        }
    }    
  },
  mounted () {
    this.$nextTick(()=>{
        this.initScroll()
        console.log(1)
    })
  },
  computed:{
    createTime () {
        let createTime = Date.parse(this.cardData.create_at);
        let nowTime = Date.now();
        let diff = nowTime - createTime;
        diff = this.diffTime(diff);
        return diff
    }      
  },
  watch : {
      id () {
        this.getIdData();
      }
  }
}
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss'; 
    .cardContent{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active{
            transition: all .2s linear;
        }
        &.move-enter, &.move-leave-active{
            transform: translate3d(100%, 0, 0); 
        }        
        .cardContent-header{    
            width:100%;
            @include border-1px(#e6e6e6);
            text-align:center;
            padding:15px 0;
            .icon-wrapper{
                display:inline-block;
                text-align:center;
                margin-left:10px;
                float:left;
                i{
                    font-size:19px;
                    border:2px solid gray;
                    border-radius:50%;
                    padding:5px;
                }
            }
            .word-wrapper{
                display:inline-block;
                margin-right:30px;
                p{
                    font-size:20px;
                }
            }
        }
        .load-wrapper{
            position:absolute;
            top:50%;
            left:50%;
            transform:translate3d(-40%,-60%,0);
            p{
                font-weight:bold;
                font-size:16px;
            }
        }
        .content-wrapper{
            position: absolute;
            top: 53px;
            left: 0;
            bottom: 63px;
            width: 100%;
            overflow: hidden;
            .public-wrapper{
                position:relative;
                padding-bottom:3px;
                margin-top:5px; 
                border-bottom:1px solid #e6e6e6;
                .avatar-wrapper{
                    display:inline-block;
                    margin:10px 3px 10px 10px;
                    img{
                        width:40px;
                        height:40px;
                        border-radius:50%;
                    }
                }
                .name-wrapper{
                    display:inline-block;
                    position:relative;
                    top:-10px;
                    h2{
                        color:#80bd01;
                    }
                }
                .time-wrapper{
                    display:inline-block;
                    position:absolute;
                    top:30px;
                    left:55px;
                    span{
                        color:gray
                    }
                }
                .person-title{
                    float:right;
                    margin:10px;
                    span{
                        color:gray;
                    }
                }
            }
            .title-wrapper{
                text-align:center;
                border-bottom:1px solid #e6e6e6;
                .title{
                    margin-top:10px;
                    text-align:center;
                    font-size:22px;
                    line-height:25px;
                    font-weight:bold;
                }
                .readcount-wrapper,.replycount-wrapper{
                    margin:10px 0;
                }
                .readcount-wrapper{
                    display:inline-block;
                    i{
                        font-size:20px;
                        vertical-align:top;
                    }
                    span{
                        font-size:13px;
                        vertical-align:top;
                    }
                }
                .replycount-wrapper{
                    display:inline-block;
                    i{
                        font-size:20px;
                        vertical-align:top;
                    }
                    span{
                        font-size:13px;
                        vertical-align:top;
                    }
                }
            }
            .html-wrapper{
                padding:10px;
                .markdown-text{
                    &>h1{
                        // font-weight:bold;
                        padding-bottom:10px;
                        font-size:25px;
                        line-height:25px;
                        border-bottom:1px solid #e6e6e6;
                        font-weight:bold;      
                    }
                    &>h2{
                        padding:10px 0 10px 0;
                        font-size:20px;
                        line-height:25px; 
                        border-bottom:1px solid #e6e6e6; 
                        font-weight:bold;
                        margin-bottom:10px;                      
                    }
                    &>p{
                        text-align:justify;
                        font-size:16px;
                        margin-bottom:10px;
                        line-height:25px;
                        &>img{
                            height:250px;
                            width:100%;
                        }
                        &>a{
                            color:blue;
                            text-decoration:none
                        }
                    }
                    &>ul{
                        padding-left:10px;
                        margin-bottom:15px;
                        &>li{
                            margin-top:8px;
                            font-size:15px;
                            line-height:25px;
                            text-align:justify;
                        }
                    }
                    &>blockquote{
                        margin:25px 0;
                        &>p{
                            padding-left:5px;
                            font-size:16px;
                            color: #6a737d;
                            border-left: 0.25em solid #dfe2e5;
                        }
                    }
                    &>table{
                        display:block;
                        width:100%;
                        thead{
                            tr{
                                background:#fff;
                                border-top: 1px solid #c6cbd1;
                                th{
                                    padding:6px 13px;
                                    border: 1px solid #dfe2e5;     
                                }
                            }
                        }
                        tbody{
                            tr{
                                background-color: #fff;
                                border-top: 1px solid #c6cbd1;
                                td{
                                    padding: 6px 13px;
                                    border: 1px solid #dfe2e5;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
