import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DualAxes, G2 } from '@ant-design/charts';
import { Statistic, Card, Col, Row } from 'antd';

const DemoColumn: React.FC = (param) => {
  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link'
      }
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink'
      }
    ]
  });
  const getFormateDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [totalHours, settotalHours] = useState(0);
  const [longestDate, setlongestDate] = useState({
    date: '',
    time: 0
  });
  const [shortestDate, setshortestDate] = useState({
    project: '',
    time: 0
  });
  const [longestProject, setlongestProject] = useState({
    project: '',
    time: 0
  });
  const [darkmode, setdarkmode] = useState(false);
  const getMaxValue = (projects) => {
    console.log('projects: ', projects);
    for (const key in projects) {
      if (projects.hasOwnProperty(key) && projects[key] === 0) {
        delete projects[key];
      }
    }
    let maxKey = '';
    let minKey = '';
    const maxValue = Math.max(...Object.values(projects));
    const minValue = Math.min(...Object.values(projects));
    console.log('minValue: ', minValue);
    for (const key in projects) {
      if (projects.hasOwnProperty(key)) {
        const value = projects[key];
        if (value == maxValue) {
          maxKey = key;
        }
        if (value == minValue) {
          minKey = key;
        }
      }
    }
    setlongestProject({
      project: maxKey,
      time: maxValue
    });
    setshortestDate({
      project: minKey,
      time: minValue
    });
  };
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode do something
      setdarkmode(true);
    }
    let datalist = [] as any;
    let totallist = [] as any;
    let tHours = 0;
    param.columnData.forEach((element) => {
      const currentDate = getFormateDate(element.range.date);

      let total_time = 0;
      if (element.projects.length > 0) {
        element.projects.forEach((project) => {
          total_time += project.total_seconds;
          const hours = project.total_seconds / 3600;
          datalist.push({
            date: currentDate,
            projects: project.name,
            value: hours,
            text: project.text
          });
        });
      } else {
        datalist.push({
          date: currentDate,
          projects: '',
          value: 0,
          text: 'no project'
        });
      }

      totallist.push({
        date: currentDate,
        total: total_time / 3600
      });
      tHours += total_time;
    });

    setdata(datalist);

    if (datalist.length > 0) {
      const projects = {};

      for (let i = 0; i < datalist.length; i++) {
        const project = datalist[i].projects;
        const time = datalist[i].value;

        if (!projects.hasOwnProperty(project)) {
          projects[project] = time;
        } else {
          projects[project] += time;
        }
      }
      getMaxValue(projects);
    }

    settotalHours(tHours / 3600);
    setdata2(totallist);
    if (totallist.length > 0) {
      const maxDateElement = totallist.reduce((prev, current) => {
        return current.total > prev.total ? current : prev;
      });
      setlongestDate({
        date: maxDateElement.date,
        time: maxDateElement.total
      });
    }
  }, [param.columnData]);

  const config = {
    data: [data, data2],
    isStack: true,
    xField: 'date',
    yField: ['value', 'total'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'projects',
        scrollbar: { type: 'horizontal' },
        tooltip: {
          formatter: function formatter(datum) {
            let time = moment.duration(datum.value * 3600, 'seconds');
            return {
              name: datum.projects,
              value: `${moment({
                h: time.hours(),
                m: time.minutes(),
                s: time.seconds()
              }).format('HH:mm:ss')}h`
            };
          }
        }
      },
      {
        geometry: 'line',
        lineStyle: { lineDash: [4, 4] },
        point: {
          size: 5,
          shape: 'diamond'
        },
        tooltip: {
          formatter: function formatter(datum) {
            let time = moment.duration(datum.total * 3600, 'seconds');
            return {
              name: datum.date,
              value: `Total ${moment({
                h: time.hours(),
                m: time.minutes(),
                s: time.seconds()
              }).format('HH:mm:ss')}h`
            };
          }
        }
      }
    ],
    slider: {},
    limitInPlot: false,
    padding: [20, 20, 50, 20],
    meta: {
      ['date']: {
        sync: false
      }
    },
    interactions: [
      { type: 'element-highlight-by-color' },
      { type: 'element-link' }
    ],
    theme: darkmode ? 'dark' : '',
    legend: true
  };

  return (
    <>
      <DualAxes
        {...config}
        onReady={(plot) => {
          plot.on('plot:click', (evt) => {
            const { x, y } = evt;
            const { xField } = plot.options;
            const tooltipData = plot.chart.getTooltipItems({ x, y });
          });
        }}
      />
      <h2>WakaTime Summary</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Working Hours"
              value={totalHours.toFixed(1)}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="The date that took the longest hours"
              value={longestDate.date + '/' + longestDate.time.toFixed(1) + 'h'}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Projects that took the longest"
              value={longestProject.project}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Projects that took the shortest"
              value={shortestDate.project}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DemoColumn;
