import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

interface DemoPieProps {
  columnData: any[];
}

const DemoPie: React.FC<DemoPieProps> = (param) => {
  const [data, setdata] = useState<Array<{ type: string; value: number }>>([]);
  useEffect(() => {
    let datalist: Record<string, any> = {};
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
    let children: Array<{ type: string; value: number }> = [];
    for (let i in datalist) {
      children.push({
        type: i,
        value: datalist[i].value
      });
    }
    setdata(children);
  }, [param.columnData]);

  var config = {
    theme: param.isDark ? 'classicDark' : 'academy',
    data,
    angleField: 'value',
    colorField: 'type',
    label: false,
    tooltip: false,
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5
      }
    }
  };
  return <Pie {...config} />;
};

export default DemoPie;
