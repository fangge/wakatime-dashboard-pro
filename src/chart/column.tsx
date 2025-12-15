import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { DualAxes } from '@ant-design/plots';
import { Statistic, Card, Col, Row } from 'antd';

interface DemoColumnProps {
  columnData: any[];
}

const DemoColumn: React.FC<DemoColumnProps> = (param) => {
  const getFormateDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
  };
  const [data, setdata] = useState<any[]>([]);
  const [data2, setdata2] = useState<any[]>([]);
  const [totalHours, settotalHours] = useState(0);
  const [moreten, setmoreten] = useState(0);
  const [longestDate, setlongestDate] = useState({
    date: '',
    time: 0
  });
  const [avgtime, setavgtime] = useState('0');
  const [longestProject, setlongestProject] = useState({
    project: '',
    time: 0
  });
  const [noworkingdays, setnoworkingdays] = useState(0);
  const [workdays, setworkdays] = useState(0);
  const [darkmode, setdarkmode] = useState(false);

  const getMaxValue = (projects: Record<string, number>) => {

    for (const key in projects) {
      if (projects.hasOwnProperty(key) && projects[key] === 0) {
        delete projects[key];
      }
    }
    let maxKey = '';
    const maxValue = Math.max(...(Object.values(projects) as number[]));
    for (const key in projects) {
      if (projects.hasOwnProperty(key)) {
        const value = projects[key];
        if (value == maxValue) {
          maxKey = key;
        }
      }
    }
    setlongestProject({
      project: maxKey,
      time: maxValue
    });
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setdarkmode(true);
    }
    let datalist: any[] = [];
    let totallist: any[] = [];
    let tHours = 0;
    let workdays = 0;
    let noworkdays = 0;
    let morethanten = 0;
    let hasprojctdays = 0;
    param.columnData.forEach((element) => {
      const currentDate = getFormateDate(element.range.date);

      let total_time = 0;
      if (element.projects.length > 0) {
        hasprojctdays++;
        if (new Date(element.range.date).getDay() > 5) {
          noworkdays++;
        }
        element.projects.forEach((project: any) => {
          total_time += project.total_seconds;
          const hours = project.total_seconds / 3600;
          datalist.push({
            time: currentDate,
            value: hours,
            type: project.name,
            text: project.text
          });
        });
      } else {
        datalist.push({
          time: currentDate,
          value: 0,
          type: '',
          text: 'no project'
        });
      }

      totallist.push({
        time: currentDate,
        count: total_time / 3600
      });
      tHours += total_time;
      if (total_time / 3600 > 10) {
        morethanten++;
      }
      if (total_time != 0) {
        workdays++;
      }
    });
    setworkdays(hasprojctdays);
    setnoworkingdays(noworkdays);
    setdata(datalist);
    setmoreten(morethanten);

    if (datalist.length > 0) {
      const projects: Record<string, number> = {};

      for (let i = 0; i < datalist.length; i++) {
        const project = datalist[i].type;
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
    setavgtime((tHours / 3600 / workdays).toFixed(2));
    setdata2(totallist);
    if (totallist.length > 0) {
      const maxDateElement = totallist.reduce((prev, current) => {
        return current.count > prev.count ? current : prev;
      });
      setlongestDate({
        date: maxDateElement.time,
        time: maxDateElement.count
      });
    }
  }, [param.columnData]);

  const charData = useCallback(() => {
    if (data.length > 0 && data2.length > 0) {
      const config = {
        xField: 'time',
        legend: true,
        slider: {
          x: {
            values: [0, 1]
          }
        },
        interaction: {
          tooltip: {
            render: (e: any, { title, items }: any) => {
              return (
                <div key={title}>
                  <h4 style={{ marginBottom: 8 }}>{title}</h4>
                  {items.map((item: any) => {
                    const { name, value, color } = item;

                    // 格式化时间显示
                    let displayValue = value;
                    if (name !== 'count') {
                      // 项目时间
                      const time = moment.duration(value * 3600, 'seconds');
                      displayValue =
                        moment({
                          h: time.hours(),
                          m: time.minutes(),
                          s: time.seconds()
                        }).format('HH:mm:ss') + 'h';
                    } else {
                      // 总计时间
                      const time = moment.duration(value * 3600, 'seconds');
                      displayValue =
                        'Total ' +
                        moment({
                          h: time.hours(),
                          m: time.minutes(),
                          s: time.seconds()
                        }).format('HH:mm:ss') +
                        'h';
                    }

                    return (
                      <div key={name} style={{ marginBottom: 4 }}>
                        <div
                          style={{
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <span
                              style={{
                                display: 'inline-block',
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: color,
                                marginRight: 6
                              }}
                            ></span>
                            <span>
                              {name === 'count' ? title + ':' : name + ':'}
                            </span>
                          </div>
                          <b style={{ marginLeft: 16 }}>{displayValue}</b>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          }
        },
        children: [
          {
            data: data,
            type: 'interval',
            yField: 'value',
            stack: true,
            colorField: 'type',
            style: { maxWidth: 80 }
          },
          {
            data: data2,
            type: 'line',
            yField: 'count',
            style: { lineWidth: 2 }
          }
        ]
      };
      return (
        <DualAxes
          {...config}
          theme={param.isDark ? 'classicDark' : 'academy'}
        />
      );
    }
  }, [data, data2, param.isDark]);

  return (
    <div>
      <h2>WakaTime Summary</h2>
      {charData()}
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
          <Card >
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
            <Statistic title="Average Working Hour" value={avgtime} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Weekend Work Days" value={noworkingdays} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Works Days More than 10h / Works Days Total"
              value={moreten + '/' + workdays}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DemoColumn;
