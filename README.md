# Wakatime Dashboard pro

> Wakatime Dashboard gets data from Gist.

_This article can also be read in [Chinese](README-zh.md)_

[![WakaTimeDashboardPro](https://img.shields.io/website-WakatimeDashbordPro-down-green-red/http/shields.io.svg)](https://wakatime.mrfangge.com/)

![banner](/img/banner.jpg)

This project is use for conveniently view your wakatime information. It contains

- **Daily column chart** project information
- **Treemap** of the projects within the selected time
- **Languages** of the projects within the selected time
- **Editors of** the projects within the selected time

*Feature: Adapt to dark night mode*

## Table of Contents

- [Background](#background)
- [GetReady](#getready)
- [Install & Build](#install--build)
- [Github Action](#githubaction)
- [Maintainers](#maintainers)
- [Changelog](#changelog)

## Background

> What is [WakaTime](https://wakatime.com/): It is a tool that can count the specific information of your daily development projects. After installing the plug-in in the corresponding editor, you can get your code information for the past 7 days. If you need to get more, you need to pay to upgrade to advanced version

This project is based on this [superman66 - wakatime-dashboard](https://github.com/superman66/wakatime-dashboard) inspiration. Big thx again. But the orgin repo can't meet my needs. So I willing to rebuild the project, analysis the data from [wakatime-api](https://wakatime.com/developers) and make them more clear to the user. Welcome to fork this project and contribute to it.

## GetReady

Backup WakaTime data to the Gist：[wakatime-sync](https://github.com/superman66/wakatime-sync)。

This project is base on your sync waktime data, So please make sure yout sync is working

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

*Tips:* Because``https://api.github.com/gists`` this api has daily request limit，you can creat an Oauth Apps to increase the limit ，link：[https://github.com/settings/developers](https://github.com/settings/developers)
![创建](https://diy-assets.msstatic.com/mrfangge/sce.png)

After creating the apps, your api url will change like this

```javascript
`https://api.github.com/gists/${gistid}?client_id=${client_id}&client_secret={$client_secret}`;
```


## Github Action
This project support to commit your build product to the branch by [Github Action](https://docs.github.com/en/actions)，of course you can set the github pages base on your branch. Get more detail in [Action Config](https://github.com/fangge/wakatime-dashboard-pro/blob/source/.github/workflows/main.yml)


## Maintainers

[@fangge](https://github.com/fangge)

## Changelog

 - *2021/6/21* - Add the Editors Preview \ Change the Column View to the DualAxes View
 - *2021/6/20* - Fixed some css bug
 - *2021/6/18* - Adapt to dark night mode
