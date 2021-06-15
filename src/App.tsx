import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { Layout, Select, DatePicker, Space, Input } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import moment from 'moment';
import Axios from 'axios';
import { getLastData, secondsFormat, swap } from '@/utils/utils';
import Column from '@/chart/column';

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
  const [columnData, setcolumnData] = useState([]);
  useEffect(() => {
    fetchSummariesData();
  }, []);

  const fetchSingleFile = (response = {}) => {
    const {
      data: { files },
    } = response;
    const fetchTasks = [];
    length = Object.keys(files).length - 1;
    const startIndex = selectedValue >= length ? 0 : length - selectedValue;
    // 选取已选中的天数
    const filesNames = Object.keys(files).slice(startIndex);

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
    // const gistId = localStorage.getItem('gistId');
    const gistId = 'bc83e2c1d834a126d85c73d116d28ec0';
    return Axios.get(
      `https://api.github.com/gists/${gistId}?client_id=7ae184ba869452c9995c&client_secret=93bc3051c608b22307c37e15ac2f204373c9e080`
    )
      .then((response) => fetchSingleFile(response))
      .then((values) => {
        const data = values.reduce((sum, current) => {
          sum.push(current.data);
          return sum;
        }, []);

        const chartData = getLastData(data);
        console.log('chartData: ', chartData);

        setcolumnData(chartData);
      });
  };

  const onSearch = (value) => console.log(value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setselectedValue(value);
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
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="waka-select">
          <Select
            defaultValue="Last 7 Days"
            className="range-select"
            onChange={handleChange}
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
            <RangePicker defaultValue={[null, moment(new Date())]} />
          </Space>
        </div>

        <div className="site-layout-content">
          <Column columnData={columnData} />
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
