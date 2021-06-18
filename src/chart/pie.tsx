import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DemoPie: React.FC = (param) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let datalist = [];
    param.columnData.forEach((item) => {
      let languages = item.languages;
      languages.forEach((item2) => {
        if (datalist[item2.name]) {
          datalist[item2.name].value += item2.total_seconds;
        } else {
          datalist[item2.name] = { value: item2.total_seconds };
        }
      });
    });
    let children = [];
    for (let i in datalist) {
      children.push({
        type: i,
        value: datalist[i].value,
      });
    }
    setdata(children);
  }, [param.columnData]);

  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend: false,
    label: {
      type: 'outer',
      content: '{name}',
      layout: [{ type: 'adjust-color' }],
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
    tooltip: false,
  };
  return <Pie {...config} />;
};

export default DemoPie;
