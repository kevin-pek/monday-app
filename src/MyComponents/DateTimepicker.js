import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateTimePicker = ({onScheduledTimeChange}) => {
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange = date => {
      setSelectedDate(date);
      const scheduleTime = date.toISOString();
      onScheduledTimeChange(scheduleTime);
    };

    return (
      <div>
        <DatePicker
            placeholderText='Schedule Date&Time'
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          timeIntervals={1}
        />
      </div>
    );
  };
  
  

  
  