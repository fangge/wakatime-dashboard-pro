import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { Layout, Select, DatePicker, Space } from 'antd';
import moment from 'moment';
import Column from '@/chart/column';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
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
  const [chartData, setChartData] = useState([]);

  return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="waka-select">
          <Select defaultValue="Last 7 Days" className="range-select">
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
          <Column />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Power by <a href="https://github.com/fangge" target="_blank">MrFangge</a>
      </Footer>
    </Layout>
  );
}

export default App;
