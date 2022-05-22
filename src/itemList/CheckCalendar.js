import Calendar from "react-calendar";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";

const DueDay = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

const CheckCalendar = ({ arr }) => {
  const data = arr.map((item) => item.dueDate);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (data.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return <DueDay />;
          }
        }}
      />
    </>
  );
};

export default CheckCalendar;
