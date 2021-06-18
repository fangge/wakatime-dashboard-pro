import React, { useState, useEffect } from 'react';
import { Treemap } from '@ant-design/charts';

const DemoTreemap: React.FC= (param) => {
  const [data, setdata] = useState({});
  useEffect(() => {
    let datalist = [];
    param.columnData.forEach((item) => {
      let projects = item.projects;
      projects.forEach((item2) => {
        if (datalist[item2.name]) {
          datalist[item2.name].value += item2.total_seconds;
        } else {
          datalist[item2.name] = { value: item2.total_seconds };
          // datalist.push({
          //   name: item2.name,
          //   value: item2.total_seconds,
          // });
        }
      });
      let children = [];
      for (let i in datalist) {
        children.push({
          name: i,
          value: datalist[i].value,
        });
      }
      setdata({
        name: 'root',
        children,
      });
    });
  }, [param.columnData]);

  var config = {
    data: data,
    colorField: 'name',
    tooltip: false,
    label: {
      position: 'middle',
      layout: [
        { type: 'adjust-color' },
      ],
    },
  };
  return <Treemap {...config} />;
};

export default DemoTreemap;
