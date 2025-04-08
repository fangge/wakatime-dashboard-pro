import React, { useState, useEffect, useCallback } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { WakaTimeStats } from '../../types/waketime';

const CalendarHeatMap: React.FC = (param: { columnData: WakaTimeStats[] }) => {
  const { columnData } = param;
  console.log('columnData: ', columnData);
  const nowYears = new Date().getFullYear();
  const startDate = `${nowYears}-01-01`;
  const endDate = `${nowYears}-12-31`;
  const [chartdata, setchartdata] = useState<
    { date: string; count: number }[]
  >([]);
  useEffect(() => {
    if (columnData.length > 0) {
      const data = columnData.map((item) => {
        return {
          date: item.range.date,
          count: item.projects.length
        };
      });
      setchartdata(data);
    }
  }, [columnData]);
  return (
    <CalendarHeatmap
      startDate={new Date(startDate)}
      endDate={new Date(endDate)}
      values={chartdata}
      titleForValue={(value) => {
        if (value != null) {
          return `Date is ${value.date}, Projects Count is ${value.count}`;
        }
      }}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-gitlab-${value.count}`;
      }}
    />
  );
};
export default CalendarHeatMap;
