# Wakatime Dashboard pro

> Wakatime Dashboard gets data from Gist.

[![WakaTimeDashboardPro](https://img.shields.io/website-WakatimeDashbordPro-down-green-red/http/shields.io.svg)](https://wakatime.mrfangge.com/)

![banner](/img/banner.jpg)

此项目可以让你方便地查看你的WakaTime项目信息

- **柱状堆叠双轴图**：查看时间范围内的每日项目概况 
- **矩形树图**：查看时间范围内项目总概况
- **饼图**： 查看时间范围内你所用的变成语言
- **卡片** ：查看时间范围内你所使用的编程软件

*Feature:*
1. 适配暗夜模式
2. 可以通过日历查看具体的时间范围
3. 提供图表下载选项

## 目录

- [背景](#背景)
- [使用前准备](#使用前准备)
- [Install & Build](#install--build)
- [Github Action](#githubaction)
- [维护者](#维护者)


## 背景

> 什么是[WakaTime](https://wakatime.com/): 它是一个可以统计你日常开发项目具体信息的工具。 在相应的编辑器中安装插件后，您可以获取您过去7天的代码信息。 如果您需要获得更多，则需要付费升级到高级版本

此项目是基于 [superman66 - wakatime-dashboard](https://github.com/superman66/wakatime-dashboard) 的灵感所开发. 再次感谢大神.但因为原项目不能满足我的需求. 所以我决定重构一下项目，分析一下 [wakatime-api](https://wakatime.com/developers) 中的数据，将数据更好的呈现出来，欢迎大家对此项目提出宝贵的意见.

## 使用前准备

 备份 WakaTime 数据到 Gist 的具体步骤请看：[wakatime-sync](https://github.com/superman66/wakatime-sync)。

> wakatime-sync的使用有个需要注意的地方，就是gits存放的数据是有限的，个人是建议每一年结束后自己备份一下全年数据，然后清空一下，重新再保存下一年的数据，因为我是从18年用到现在的，19年的时候突然某段时间发现数据断了，后来才发现gist提示数据过多，所以各位可以定时备份一下，或者每一年用不同的gistid也可以
## Install && Build

- install
```bash
git clone https://github.com/fangge/wakatime-dashboardpro.git && cd wakatime-dashboardv2
npm i && npm run dev
```
-  build
```bash
npm run build
```

*Tips:* 因为https://api.github.com/gists 这个方法请求 gist 每日是有次数限制的，如果你觉得项目可能需要多次访问，建议可以新建一个 Oauth Apps，创建地址：[https://github.com/settings/developers](https://github.com/settings/developers)
![创建](/img/secres.png)

创建好后，你请求的地址就改成

```javascript
`https://api.github.com/gists/${gistid}?client_id=${client_id}&client_secret={$client_secret}`;
```


## Github Action

> 本项目默认分支是设置了source，然后将构建好的文件推送到master分支，然后github page生成的时候读取的是master分支内的文件，可在`[Action Config](https://github.com/fangge/wakatime-dashboard-pro/blob/source/.github/workflows/main.yml)中修改相关分支，已写相关注释

在项目的**Setting**中增加两个参数：ACCESS_TOKEN 和 BASE_DOMAIN
![](https://diy-assets.msstatic.com/mrfangge/sc2.jpg)
- **ACCESS_TOKEN**： 在[Personal access tokens](https://github.com/settings/tokens) 中新建token
- **BASE_DOMAIN**：BASE_DOMAIN可选，如果你的Github Page自定义了域名，则需要添加，如果不需要，可自行在yml中删除构建的--base参数


## Maintainers

[@fangge](https://github.com/fangge)


