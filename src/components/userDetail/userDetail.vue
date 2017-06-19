<template>
    <transition name="move">
        <div class="userDetail" v-if="show">
            <div class="userDetail-header clearfix">
                <i class="iconfont icon-wrapper" @click="showDetail">&#xe600;</i>
                <div class="word">用户详细信息</div>
            </div>
            <div class="userDatail-content">
                <div class="avatar-wrapper">
                    <img :src="userData.avatar_url">
                </div>
                <div class="user-name">
                    <p class="name">用户名：{{userData.loginname}}</p>
                </div>
                <div class="github-name">
                    <p class="name">Github：{{userData.githubUsername}}</p>
                </div>
                <div class="create-time">
                    <p class="time">用户创建时间：{{userData.create_at | filterTime}}</p>
                </div>
                <div class="score-wrapper">
                    <span class="score">获得分数：{{userData.score}}</span>
                </div>
                <div class="recent-replies">
                    <div class="no-replies" v-show="userData.recent_replies.length === 0">
                        <p>没有任何评论</p>
                    </div>
                    <div class="no-topics" v-show="userData.recent_topics.length === 0">
                        <p>没有任何主题</p>
                    </div>                    
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
const API = 'https://cnodejs.org/api/v1/user/'

export default {
    data() {
        return {
            show:false,
            userData:{}
        }
    },
    props:{
        data:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    methods:{
        showDetail() {
            this.show = !this.show
        }
    },
    mounted() {
        if(this.data){
            this.$http.get(`${API}${this.data.loginname}`).then(res=>{
                let {data} = res.data
                if(res.data.success){
                    this.userData = data
                    console.log(data)
                }
            })
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

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss'; 
    .userDetail{
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        transform: translate3d(0, 0, 0);
        background:linear-gradient(to bottom, #315481, #918e82 100%);
        &.move-enter-active, &.move-leave-active{
            transition: all .2s linear;
        }
        &.move-enter, &.move-leave-active{
            transform: translate3d(100%, 0, 0); 
        }
        .userDetail-header{
            background:#fff;
            text-align:center;
            height:50px;
            line-height:50px;
            @include border-1px(#e6e6e6);
            .icon-wrapper{
                float:left;
                margin-top:5px;
                width:40px;
                height:40px;
                border-radius:50%;
                border:1px solid gray;
                text-align:center;
                line-height:37px;
                margin-left:10px;
                font-size:20px;
                border-radius:50%;
            }
            div{
                display:inline-block;
                text-align:center;
                margin-right:30px;
                 font-size:18px; 
            }
        }
        .userDatail-content{
            position:fixed;
            top:25%;
            width:100%;
            background-size: 100% 100%;
            .avatar-wrapper{
                width:100px;
                height:100px;
                border-radius:50%;
                margin:6px auto;
                img{
                    width:100px;
                    height:100px;
                    border-radius:50%;
                    border:3px solid #fff;
                }
            }
            .user-name{
                text-align:center;
                padding:5px 0;
                p{
                    color:#fff;
                    font-weight:bold;
                }
            }
            .github-name{
                text-align:center;
                padding:5px 0;
                p{
                    color:#fff;
                    font-weight:bold;
                }                
            }
            .create-time{
                text-align:center;
                padding:5px 0;
                p{
                    color:#fff;
                }
            }
            .score-wrapper{
                text-align:center;
                padding:5px 0;
                span{
                    color:#fff;
                }                
            }
            .recent-replies{
                .no-replies{
                    text-align:center;
                    padding-top:5px;
                    p{
                        color:#fff;
                    }
                }
                .no-topics{
                    text-align:center;
                    p{
                        color:#fff;
                    }
                }                
            }
        }
    }

</style>
