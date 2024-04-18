import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "./Calendrier.css";

export default function Calendrier({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    const day = newDate.$d.getDate();
    const month = newDate.$d.getMonth() + 1;
    const year = newDate.$d.getFullYear();

    setSelectedDate(newDate);
    onDateChange(day, month, year);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDatePicker"]}>
        <DemoItem>
          <StaticDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            className="pickd"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
