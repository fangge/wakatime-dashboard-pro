# Wakatime Dashboard pro

> Wakatime Dashboard gets data from Gist.

Original project link: https://github.com/superman66/wakatime-dashboard

[Demo](https://wakatime.mrfangge.com/`)

[中文文档](README.md)

Thanks to the great project by the master, which provides a convenient way to display wakatime charts. As a faithful fan of wakatime, I like to review my programming data.

However, although I forked the original project and added time support, and also optimized the way to access gist data by pushing a request to the master, I still feel that I need to rebuild it to make it more clear with more data displayed. Thus, I created this "Pro" version.


![](https://diy-assets.msstatic.com/mrfangge/dashborad.png)

## Upgraded features

1. The bar chart can have a linkage effect, showing the daily time changes of each project.
2. You can select a specific time period, rather than just a certain number of days.
3. Add a rectangular tree chart of projects used during the selected time period, clearly showing the time spent on each project.
4. Add a summary of programming languages used during the selected time period.
5. Add a summary table of projects during the selected time period, showing the development time of each project. Also, editing rows has been added to facilitate outputting weekly project reports.
6. Add project statistics for the selected time period: total time spent, the date with the longest time spent on coding, the longest and shortest projects used.

## Usage

1. Backup your WakaTime data to Gist, follow these steps: [wakatime-sync](https://github.com/superman66/wakatime-sync)。
2. Enter the Gist ID that you created in the input box to access your Waka overview.

> One thing to note about using wakatime-sync is that the data stored in Gist is limited. I personally recommend backing up the data for each year after the end of the year, and then clearing it and saving the data for the next year. I have been using wakatime-sync since 2018, and I found that the data was suddenly interrupted in 2019. Later I found that Gist indicated that the data was too much. So you can backup regularly, or use different Gist IDs for each year.

### Oauth Apps

Because there is a daily limit to requests to gist using the method https://api.github.com/gists，if you think your project may need to be accessed multiple times, it is recommended to create a new Oauth Apps. You can create it here: ：[https://github.com/settings/developers](https://github.com/settings/developers)
![创建](https://diy-assets.msstatic.com/mrfangge/sce.png)

After creating it, change the request address to:

```javascript
`https://api.github.com/gists/${gistid}?client_id=${client_id}&client_secret={$client_secret}`;
```

## Project construction

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

## GitHub Action with GitHub Pages

> The default branch of this project is set to source, and the built files are pushed to the master branch. When GitHub Pages is generated, it reads the files inside the master branch. You can modify the relevant branches in `.github/workflows/main.yml`, which already has the necessary comments. 

Add two parameters in the Settings of your project: ACCESS_TOKEN and BASE_DOMAIN.
![](https://diy-assets.msstatic.com/mrfangge/sc2.jpg)

- **ACCESS_TOKEN**：  Create a new token in [Personal access tokens](https://github.com/settings/tokens).
- **BASE_DOMAIN**：`BASE_DOMAIN is` optional. If you have customized the domain of your GitHub Pages, you need to add it. If not, you can delete the --base parameter in the YML file yourself.