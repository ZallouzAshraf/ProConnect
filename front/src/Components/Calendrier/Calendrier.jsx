import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "./Calendrier.css";

export default function Calendrier() {
  const [selectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    const day = newDate.$d.getDate();
    const month = newDate.$d.getMonth() + 1;
    const year = newDate.$d.getFullYear();

    console.log("Selected Day:", day);
    console.log("Selected Month:", month);
    console.log("Selected Year:", year);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDatePicker"]}>
        <DemoItem>
          <StaticDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <input {...params} />}
            className="pickd"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
