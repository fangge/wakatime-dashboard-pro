import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Column, G2 } from '@ant-design/charts';
import Item from 'antd/lib/list/Item';

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
  useEffect(() => {
    console.log(param.columnData);
    let datalist = [];
    param.columnData.forEach((element) => {
      const currentDate = getFormateDate(element.range.date);
      element.projects.forEach((project) => {
        const hours = project.total_seconds / 3600;
        datalist.push({
          date: currentDate,
          projects: project.name,
          value: hours,
          text: project.text,
        });
      });
    });
    console.log('datalist', datalist);
    setdata(datalist);
  }, [param.columnData]);

  const config = {
    data,
    isStack: true,
    xField: 'date',
    yField: 'value',
    seriesField: 'projects',
    scrollbar: { type: 'horizontal' },
    tooltip: false,
    interactions: [
      { type: 'element-highlight-by-color' },
      { type: 'element-link' },
    ],
    legend: false,
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
  };

  return (
    <Column
      {...config}
      onReady={(plot) => {
        plot.on('plot:click', (evt) => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });
      }}
    />
  );
};

export default DemoColumn;
