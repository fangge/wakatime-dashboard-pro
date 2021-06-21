import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import moment from 'moment';

const Editors: React.FC = (param) => {
  const [editdata, seteaditdata] = useState({});
  useEffect(() => {
    let data = {};
    param.columnData.forEach((element) => {
      element.editors.forEach((editors) => {
        if (data[editors.name]) {
          data[editors.name].total_seconds += editors.total_seconds;
        } else {
          data[editors.name] = {total_seconds:editors.total_seconds};
        }
      })
    });
    console.log(data);
    seteaditdata(data);
  }, [param.columnData]);
  return (
    <Card title="Editors">
      {Object.keys(editdata).map((key) => {
        console.log(editdata[key]);
        const time = moment.duration(editdata[key].total_seconds, 'seconds');
        const usetime = `${time.hours()}h ${time.minutes()}m`
        return (
          <Card type="inner" title={key}>
            Usage Time : {usetime}
          </Card>
        );
      })}
    </Card>
  );
};

export default Editors;
