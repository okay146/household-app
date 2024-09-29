import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField'; 
import dayjs, { Dayjs } from 'dayjs';

const DateCalendar = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="取引日付"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{ width: "12em", marginTop: "8px"}}
            />
        </LocalizationProvider>
    );
};

export default DateCalendar;
