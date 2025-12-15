import React, { useState, useEffect } from 'react';
import { Treemap } from '@ant-design/plots';

interface DemoTreemapProps {
  columnData: any[];
}

const DemoTreemap: React.FC<DemoTreemapProps> = (param) => {
  const [data, setdata] = useState<{
    name: string;
    children: Array<{ name: string; value: number }>;
  }>({ name: 'root', children: [] });
  useEffect(() => {
    let datalist: Record<string, any> = {};
    param.columnData.forEach((item) => {
      let projects = item.projects;
      projects.forEach((item2) => {
        if (datalist[item2.name]) {
          datalist[item2.name].value += item2.total_seconds;
        } else {
          datalist[item2.name] = { value: item2.total_seconds };
        }
      });
    });

    let children: { name: string; value: number }[] = [];
    for (let i in datalist) {
      if (datalist[i].value > 0) {
        children.push({
          name: i,
          value: Math.floor(datalist[i].value / 3600)
        });
      }
    }
    setdata({
      name: 'root',
      children
    });
  }, [param.columnData]);

  var config = {
    theme: param.isDark ? 'classicDark' : 'academy',
    tooltip: {
      title: (item) => {
        return item.value + 'h';
      }
    },
    scale: {
      color: {
        range: [
          '#4e79a7',
          '#f28e2c',
          '#e15759',
          '#76b7b2',
          '#59a14f',
          '#edc949',
          '#af7aa1',
          '#ff9da7',
          '#9c755f',
          '#bab0ab',
        ],
      },
    },
    data,
    colorField: 'value',
    valueField: 'value',

    legend: false
  };
  return <Treemap {...config} />;
};


export default DemoTreemap;
