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
                    <div class="reply-wrapper">
                        <div class="count-wrapper">
                            <p>共{{cardData.reply_count}}条回复</p>
                        </div>
                        <ul>
                            <li v-for=" (item,index) of  cardData.replies" class="replyPerson-wrapper">
                                <span class="floor">#{{index}}</span>
                                <div class="avatar-wrapper">
                                    <img :src="item.author.avatar_url">
                                </div>
                                <div class="name-wrapper">
                                    <span class="name">{{item.author.loginname}}</span>
                                </div>
                                <div class="time-wrapper">
                                    <span class="time">{{item.create_at | filterTime }}</span>
                                </div>
                                <div v-html="item.content"></div>
                                <div class="icon-wrapper">
                                    <div class="praise-wrapper">
                                        <i class="iconfont">&#xe60e;</i>
                                        <span class="num" v-show="item.ups.length>0">{{item.ups.length}}</span>
                                    </div>
                                    <div class="used-wrapper">
                                        <i class="iconfont" :class="{'active':item.is_uped}">&#xe64e;</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="login-wrapper">
                            <p class="login">
                                你还未登录，请先<a>登录</a>
                            </p>
                        </div>
                    </div>
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
    createTime() {
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
  },
  filters : {
      filterTime(val) {
        if(!val)return
        let time = val.split('T')[0]
        return time
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
        padding-bottom:20px;
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
                        font-size:28px;
                        line-height:25px;
                        border-bottom:1px solid #e6e6e6;
                        font-weight:bold;      
                    }
                    &>h2{
                        padding:10px 0 10px 0;
                        font-size:23px;
                        line-height:25px; 
                        border-bottom:1px solid #e6e6e6; 
                        font-weight:bold;
                        margin-bottom:10px;                      
                    }
                    &>h3{
                        padding:10px 0 10px 0;
                        font-size:19px;
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
                            text-decoration:none;
                        }
                        &>code{

                        }
                        &>strong{
                            font-weight:bold;
                        }
                    }
                    &>ul{
                        padding-left:10px;
                        margin-bottom:15px;
                        li{
                            margin-top:8px;
                            font-size:15px;
                            line-height:25px;
                            text-align:justify;
                            a{
                                color:blue;
                                text-decoration:none;
                            }
                        }
                    }
                    &>blockquote{
                        margin:25px 0;
                        &>p{
                            padding-left:5px;
                            font-size:16px;
                            color: #6a737d;
                            border-left: 0.25em solid #dfe2e5;
                            a{
                                display:block;
                                color:blue;
                                text-decoration:none;
                            }
                        }
                        &>ul{
                            li{
                                a{
                                    color:blue;
                                    text-decoration:none;
                                }
                            }
                        }
                    }
                    &>table{
                        overflow:auto;
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
                    &>pre{
                        padding: 16px;
                        overflow: auto;
                        font-size: 85%;
                        line-height: 1.45;
                        background-color: #f6f8fa;
                        border-radius: 3px;  
                        code{
                            color:black;
                            display: inline;
                            max-width: auto;
                            padding: 0;
                            margin: 0;
                            overflow: visible;
                            line-height: inherit;
                            word-wrap: normal;
                            background-color: transparent;
                            border: 0;                            
                        }                      
                    }
                    &>ol{
                        li{
                            code{

                            }
                        }
                    }
                    &>pre{
                        code{
                            font-size:14px;
                        }
                    }
                }
            }
        }
        .reply-wrapper{
            .count-wrapper{
                border-top:1px solid #e6e6e6;
                border-bottom:1px solid #e6e6e6;
                border-left:5px solid #80bd01;
                padding:7px 0 7px 5px;
            }
            .replyPerson-wrapper{
                border:1px solid red;
                .avatar-wrapper{
                    img{
                        width:60px;
                        height:70px;
                    }
                }
            }
        }
    }
</style>
