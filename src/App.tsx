import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import {
  Layout,
  Select,
  DatePicker,
  Space,
  Input,
  message,
  Row,
  Col,
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import moment from 'moment';
import Axios from 'axios';
import { getLastData, secondsFormat, swap } from '@/utils/utils';
import Column from '@/chart/column';
import TreeMap from '@/chart/treemap';
import Pie from '@/chart/pie';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

function App() {
  const datePickerData = [
    {
      value: 7,
      label: 'Last 7 Days',
    },
    {
      value: 14,
      label: 'Last 14 Days',
    },
    {
      value: 30,
      label: 'Last 30 Days',
    },
    {
      value: 90,
      label: 'Last 90 Days',
    },
    {
      value: 365,
      label: 'Last Year',
    },
  ];
  const [selectedValue, setselectedValue] = useState(7);
  const [selecthide, setselecthide] = useState(false);
  const [columnData, setcolumnData] = useState([]);
  const [gistId, setgistId] = useState('');
  const [diffdays, setdiffdays] = useState(0);
  const [dates, setDates] = useState([]);
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    fetchSummariesData();
    if (localStorage.getItem('gistId')) {
      setgistId(localStorage.getItem('gistId'));
    } else {
      message.info('Please Enter Yout GistId');
    }
  }, [gistId, selecthide, endDate, selectedValue]);

  const fetchSingleFile = (response = {}) => {
    const {
      data: { files },
    } = response;
    const fetchTasks = [];
    const filesKeysArr = Object.keys(files);
    length = filesKeysArr.length - 1;
    let filesNames;

    if (selecthide) {
      let endIndex = filesKeysArr.findIndex((value, index, arr) => {
        return value.indexOf(endDate) > -1;
      });
      let startIndex = endIndex - diffdays;
      filesNames = filesKeysArr.slice(startIndex, endIndex + 1);
    } else {
      const startIndex = selectedValue >= length ? 0 : length - selectedValue;
      // 选取已选中的天数
      filesNames = filesKeysArr.slice(startIndex);
    }

    filesNames.forEach((fileName) => {
      // eslint-disable-next-line
      const { type, filename, raw_url } = files[fileName] || {};
      if (type === 'application/json' && /summaries/.test(filename)) {
        fetchTasks.push(Axios.get(raw_url));
      }
    });
    return Promise.all(fetchTasks);
  };

  const fetchSummariesData = () => {
    let gistid = gistId || localStorage.getItem('gistId');
    if (!gistid) {
      return;
    } else {
      return Axios.get(
        `https://api.github.com/gists/${gistid}?client_id=7ae184ba869452c9995c&client_secret=93bc3051c608b22307c37e15ac2f204373c9e080`
      )
        .then((response) => fetchSingleFile(response))
        .then((values) => {
          const data = values.reduce((sum, current) => {
            sum.push(current.data);
            return sum;
          }, []);

          const chartData = getLastData(data);

          setcolumnData(chartData);
        });
    }
  };

  const onSearch = (value) => {
    console.log(value);
    if (value) {
      localStorage.setItem('gistId', value);
      setgistId(value);
    }
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setselectedValue(value);
  };
  const handleData = (time) => {
    if (!time) {
      return false;
    } else {
      return time > moment();
    }
  };
  return (
    <Layout className="layout">
      <Header className="waka-hd">
        <a
          href="https://github.com/fangge/wakatime-dashboardv2"
          target="_blank"
        >
          <GithubOutlined />
          wakatime-dashboard pro
        </a>
        <Search
          align="center"
          onSearch={onSearch}
          enterButton
          placeholder="Enter Your Gist Id"
          className="gist-input"
          value={gistId}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="waka-select">
          <Select
            defaultValue="Last 7 Days"
            className="range-select"
            onChange={handleChange}
            disabled={selecthide}
          >
            {datePickerData.map((item) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
          <Space size={12}>
            <RangePicker
              onCalendarChange={(val) => {
                if (val == null || val[1] == null) {
                  setselecthide(false);
                } else {
                  setselecthide(true);
                  setdiffdays(val[1].diff(val[0], 'days')); // diff days
                  setEndDate(val[1].format('YYYY-MM-DD'));
                  setDates(val);
                }
              }}
              allowClear={true}
              disabledDate={handleData}
            />
          </Space>
        </div>

        <div className="site-layout-content">
          {gistId && (
            <div className="chart-detail">
              <h2>Project Overview</h2>
              <Column columnData={columnData} />
              <Row>
                <Col span={12}>
                  <h2>General overview of projects time in the interval</h2>
                  <TreeMap columnData={columnData} />
                </Col>
                <Col span={12}>
                  <h2>Languages</h2>
                  <Pie columnData={columnData} />
                </Col>
              </Row>
            </div>
          )}
          {!gistId && (
            <svg
              t="1623896018865"
              className="empty"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2881"
            >
              <path
                d="M64 640h64a32 32 0 0 0 0-64h-30.432a412.96 412.96 0 0 1 98.784-238.4l21.344 21.344a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248l-21.344-21.344A412.992 412.992 0 0 1 480 193.568V224a32 32 0 0 0 64 0v-30.432a412.96 412.96 0 0 1 238.4 98.784l-21.344 21.344a32 32 0 1 0 45.248 45.248l21.344-21.344A412.992 412.992 0 0 1 926.432 576H896a32 32 0 0 0 0 64h64a32 32 0 0 0 32-32c0-127.84-49.888-248.32-140.576-339.392v-0.032l-0.064-0.032A477.984 477.984 0 0 0 512 128C384.16 128 263.68 177.888 172.608 268.576h-0.032l-0.032 0.064A477.984 477.984 0 0 0 32 608a32 32 0 0 0 32 32z"
                fill="#5465CF"
                p-id="2882"
              ></path>
              <path
                d="M474.88 684.48l-237.888-105.728a32 32 0 1 0-25.984 58.496l237.664 105.44A63.84 63.84 0 0 0 512 800c35.296 0 64-28.704 64-64s-28.704-64-64-64a63.36 63.36 0 0 0-37.12 12.48zM976 736a16 16 0 1 0 0-32h-64a16 16 0 0 0-16 16v128a16 16 0 1 0 32 0V800h48a16 16 0 1 0 0-32H928v-32h48zM48 864h64a16 16 0 1 0 0-32H64v-32h48a16 16 0 1 0 0-32H64v-32h48a16 16 0 1 0 0-32h-64a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16z"
                fill="#5465CF"
                p-id="2883"
              ></path>
            </svg>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Power by{' '}
        <a href="https://github.com/fangge" target="_blank">
          MrFangge
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
