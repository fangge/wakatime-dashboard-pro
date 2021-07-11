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
          data[editors.name] = { total_seconds: editors.total_seconds };
        }
      });
    });
    seteaditdata(data);
  }, [param.columnData]);
  const formatSeconds = (value) => {
    let theTime = parseInt(value); // 秒
    let theTime1 = 0; // 分
    let theTime2 = 0; // 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }

    var result = '' + parseInt(theTime); //秒
    if (10 > theTime > 0) {
      result = '0' + parseInt(theTime)+'s'; //秒
    } else {
      result = '' + parseInt(theTime)+'s'; //秒
    }

    if (10 > theTime1 > 0) {
      result = '0' + parseInt(theTime1) + 'm ' + result; //分，不足两位数，首位补充0，
    } else {
      result = '' + parseInt(theTime1) + 'm ' + result; //分
    }
    if (theTime2 > 0) {
      result = '' + parseInt(theTime2) + 'h ' + result; //时
    }
    return result;
  };
  return (
    <Card title="Editors">
      {Object.keys(editdata).map((key) => {
        return (
          <Card type="inner" title={key}>
            Usage Time : {formatSeconds(editdata[key].total_seconds)}
          </Card>
        );
      })}
    </Card>
  );
};

export default Editors;
