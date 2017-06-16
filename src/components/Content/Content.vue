<template>
    <div class="card-wrapper"> 
        <div class="card" @click = "conso">
            <div class="card-header">
                <div class="avatar-warpper">
                    <img :src="cardData.author.avatar_url">
                </div>
                    <div class="good-wrapper" v-if="cardData.good">
                        <i class="iconfont good">&#xe607;</i>
                    </div>
                    <div class="top-wrapper" v-if="cardData.top">
                        <i class="iconfont top">&#xe667;</i>
                </div>
                <p class="name">{{cardData.author.loginname}}</p>
                <div class="tab-wrapper">
                    <p class="time">{{createTime}}</p>
                    <span class="tab">{{tabTopic}}</span>
                </div>   
                <div class="card-title">
                    <h2 class="title">{{cardData.title}}</h2>
                </div>
            </div>
            <div class="card-footer">
                <div class="visit-count">
                    <i class="iconfont">&#xe681;</i>
                    <span class="visit">{{cardData.visit_count}}</span>
                </div>
                <div class="reply-count">
                    <i class="iconfont">&#xe606;</i>
                    <span class="reply">{{cardData.reply_count}}</span>
                </div>
                <div class="replytime-count">
                    <i class="iconfont">&#xe601;</i>
                    <span class="time">{{replyTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        cardData :{
            type : Object
        }
    },
    data () {
        return {
            
        }
    },
    computed :{
        createTime () {
            let createTime = Date.parse(this.cardData.create_at);
            let nowTime = Date.now();
            let diff = nowTime - createTime;
            diff = this.diffTime(diff);
            return diff
        },
        tabTopic () {
            if(this.cardData.tab === 'ask'){
                return '提问'
            }
            if(this.cardData.tab === 'share'){
                return '分享'
            }
            if(this.cardData.tab === 'job'){
                return '招聘'
            }
            if(this.cardData.tab === 'good'){
                return '优秀'
            }
        },
        replyTime () {
            let lastReplyTime = Date.parse(this.cardData.last_reply_at);
            let nowTime = Date.now();
            let diff = nowTime - lastReplyTime;
            diff = this.diffTime(diff);
            return diff;
        }
    },
    methods : {
        conso() {
            console.log(this.cardData)
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
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss'; 

    .card-wrapper{
        background:#fff;
        width:100%;
        margin:5px 0;
        .card{
            position:relative;
            .card-header{
                padding-bottom:8px;
                @include border-1px(#e6e6e6);
                .avatar-warpper{
                    display:inline-block;
                    border-radius:50%;
                    margin:10px 5px 5px 10px;
                    img{
                        width:50px;
                        height:50px;
                        border-radius:50%;
                    }
                }
                .good-wrapper{
                    text-align:center;
                    position:absolute;
                    top:10px;
                    right:50px;
                    .good{
                        font-size:35px;
                        color:#e15439;
                    }
                }
                .top-wrapper{
                        text-align:center;
                        position:absolute;
                        top:8px;
                        right:20px;
                    .top{
                        position:relative;
                        font-size:28px;
                        color:#e15439;
                    }
                }
                .name{
                    position:relative;
                    display:inline-block;
                    font-weight:bold;
                    top:-15px;
                    font-size:16px;
                }
                .tab-wrapper{
                    display:inline-block;
                    position:absolute;
                    top:25px;
                    left:69px;
                    .time{
                        color:gray;
                        margin-bottom:-3px;
                    }
                    .tab{
                        color:green;
                    }
                }
                .card-title{
                    margin:15px 10px 0 15px;
                    .title{
                        font-weight:bold;
                        font-size:16px;
                        text-align:justify;
                    }
                }
            }
            .card-footer{
                padding:5px 0 ;
                display:flex;
                color:gray;
                .visit-count{
                    flex:1;
                    text-align:center;
                    i{
                        vertical-align:top;
                    }
                    span{
                        vertical-align:top;
                    }
                }
                .reply-count{
                    flex:1;
                    text-align:center;
                    i{
                        vertical-align:top;
                    }
                    span{
                        vertical-align:top;
                    }                    
                }
                .replytime-count{
                    flex:1;
                    text-align:center;
                    i{
                        vertical-align:top;
                    }
                    span{
                        vertical-align:top;
                    }                    
                }
            }
        }
    }
</style>
