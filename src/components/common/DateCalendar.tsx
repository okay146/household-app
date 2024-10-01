import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField'; 
import dayjs, { Dayjs } from 'dayjs';
import { Stack } from '@mui/system';
import { Divider, Typography } from '@mui/material';

const DateCalendar = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} direction="row" alignItems="center">
            <DatePicker
                label="開始日付"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{ width: "12em", marginTop: "8px"}}
                name="start_date"
            />
            <Typography>〜</Typography>
            <DatePicker
                label="終了日付"
                value={endValue}
                onChange={(newValue) => setEndValue(newValue)}
                sx={{ width: "12em", marginTop: "8px"}}
                name="end_date"
            />
            </Stack>
        </LocalizationProvider>
    );
};

export default DateCalendar;
