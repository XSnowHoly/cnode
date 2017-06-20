# vue-cnode

> 前言 
项目灵感的最初来源是@shinygang来自的Vue-cnodejs， 感谢cnodejs社区提供的API， https://github.com/PeterCheng1/cnode

# 技术栈

>Vue2.0 + Vue-router + axios + Vuex + material-UI + scss + webpack + better-scroll + es6/7

### 运行效果GIF

![效果1](./static/gif/cnode1.gif)
</br>
![效果2](./static/gif/cnode3.gif)


### 功能
- [x] 首页列表，上拉加载
- [x] 主题详情，回复，点赞
- [x] 消息列表
- [x] 消息提醒
- [x] 消息标记为已读
- [x] 个人主页
- [x] 用户信息
- [x] 登录
- [x] 退出
- [x] 关于
- [x] 页面后退，数据还原
- [x] 页面后退，滚动位置还原


### 项目还在持续更新中，以后计划：
1. 优化css
2. 优化router
3. 优化vuex
4. 加入transition效果
5. 修改部分存在的BUG

## 运行项目

``` bash
# step1
git clone git@github.com:PeterCheng1/cnode.git

# step2
npm install

# step3
npm run dev

# step4如果需要打包部署
npm run build

# step4如果需要打包部署
npm run build --report
```
访问 http://127.0.0.1:8080

然后登录草料获取二维码，在手机上运行


# 感言

<li>做这个项目的初衷：经常浏览cnode社区，发现很多人都用各种技术栈实现cnode社区，所以有了这个项目</li>

<li>做这个项目之前，也参考了很多人写的cnode社区页面，像首页的页面布局就套用了lzxb, 但实现完全自己手工制作</li>

<li>最后要感谢的就是cnode社区提供的api，让我们可以尽情的玩转社区</li>