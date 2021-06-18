# Wakatime Dashboard pro

> Wakatime Dashboard gets data from Gist.

原大神项目地址：https://github.com/superman66/wakatime-dashboard

感谢大神弄了那么方便的 wakatime 图表展示，因为自己本身也是 wakatime 的忠实粉丝，很喜欢回看自己的编程数据

但是原来的这个项目虽然自己 fork 了之后加上了时间，也有 push 一个 request 给大神一个访问 gist 数据方式的优化，但终究还是觉得自己重新折腾一下，增加一些数据展示会清晰一些，所以制作了这个自称 pro 的版本

![](https://diy-assets.msstatic.com/mrfangge/dashborad.png)

## 升级的功能
1. 柱状图可以有联动效果，知道每个项目每天的时间变化
2. 可以选择具体的某个时间段，而不是只是单纯的前N天
3. 增加选择的时间区间内的项目矩形树图，清晰知道自己这段时间每个项目占用的时间
4. 增加选择的时间区间内使用的编程语言汇总

## 使用步骤

1. 备份 WakaTime 数据到 Gist 的具体步骤请看：[wakatime-sync](https://github.com/superman66/wakatime-sync)。
2. 将建好的 GistId 输入到输入框中，即可访问你的项目 Waka 概况

> wakatime-sync的使用有个需要注意的地方，就是gits存放的数据是有限的，个人是建议每一年结束后自己备份一下全年数据，然后清空一下，重新再保存下一年的数据，因为我是从18年用到现在的，19年的时候突然某段时间发现数据断了，后来才发现gist提示数据过多，所以各位可以定时备份一下，或者每一年用不同的gistid也可以

### Oauth Apps

因为https://api.github.com/gists 这个方法请求 gist 每日是有次数限制的，如果你觉得你可能需要多次访问，可以新建一个 Oauth Apps，创建地址：[https://github.com/settings/developers](https://github.com/settings/developers)
![创建](https://diy-assets.msstatic.com/mrfangge/sce.png)

创建好后，你请求的地址就改成

```javascript
`https://api.github.com/gists/${gistid}?client_id=${client_id}&client_secret={$client_secret}`;
```

## 项目构建

[Vite](https://cn.vitejs.dev/) + [React](https://zh-hans.reactjs.org/) + [Ant Design](https://ant.design/index-cn) + [Ant Design Charts](https://charts.ant.design/)

### Usage

```bash
git clone https://github.com/fangge/wakatime-dashboardpro.git && cd wakatime-dashboardv2
npm i && npm run dev
```

### build

```bash
npm run build
```
