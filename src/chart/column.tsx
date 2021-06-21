import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { DualAxes, G2 } from '@ant-design/charts';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const DemoColumn: React.FC = (param) => {
  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link',
      },
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink',
      },
    ],
  });
  const getFormateDate = (date) => {
    return moment(date).format('YYYYMMDD');
  };
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [darkmode, setdarkmode] = useState(false);
  const ref = useRef();

  // 导出图片
  const downloadImage = () => {
    ref.current?.downloadImage();
  };

  // 获取图表 base64 数据
  const toDataURL = () => {
    console.log(ref.current?.toDataURL());
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode do something
      setdarkmode(true);
    }
    let datalist = [];
    let totallist = [];
    param.columnData.forEach((element) => {
      const currentDate = getFormateDate(element.range.date);
      let total_time = 0;

      element.projects.forEach((project) => {
        total_time += project.total_seconds;
        const hours = project.total_seconds / 3600;
        datalist.push({
          date: currentDate,
          projects: project.name,
          value: hours,
          text: project.text,
        });
      });
      totallist.push({
        date: currentDate,
        total: total_time / 3600,
      });
    });

    setdata(datalist);
    setdata2(totallist);
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
                s: time.seconds(),
              }).format('HH:mm:ss')}`,
            };
          },
        },
      },
      {
        geometry: 'line',
        tooltip: {
          formatter: function formatter(datum) {
            let time = moment.duration(datum.total * 3600, 'seconds');
            return {
              name: datum.date,
              value: `Total ${moment({
                h: time.hours(),
                m: time.minutes(),
                s: time.seconds(),
              }).format('HH:mm:ss')}`,
            };
          },
        },
      },
    ],
    slider: {},
    limitInPlot: false,
    padding: [20, 20, 50, 20],
    meta: {
      ['date']: {
        sync: false,
      },
    },
    interactions: [
      { type: 'element-highlight-by-color' },
      { type: 'element-link' },
    ],
    theme: darkmode ? 'dark' : '',
    legend: false,
  };

  return (
    <div className="char1">
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size={'large'}
        onClick={downloadImage}
      >
        Download Chart
      </Button>
      <DualAxes chartRef={ref} {...config} />
    </div>
  );
};

export default DemoColumn;
