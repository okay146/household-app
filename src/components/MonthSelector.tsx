import { Box, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ja } from "date-fns/locale";
import { addMonths } from 'date-fns';

interface MonthSelectorProps {
    currentMonth: Date;
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const MonthSelector = ({currentMonth, setCurrentMonth}: MonthSelectorProps) => {

    const handleDateChange = (newDate: Date | null) => {
        if(newDate) {
            setCurrentMonth(newDate);
        }
    };

    const handlePreviousMonth = () => {
        // 先月は今月のマイナス１
        const previousMonth = addMonths(currentMonth, -1);
        setCurrentMonth(previousMonth);
    };
    const handleNextMonth = () => {
        // 先月は今月のプラス１
        const nextMonth = addMonths(currentMonth, 1);
        setCurrentMonth(nextMonth);
    };

    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns} 
            adapterLocale={ja}
        >
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button 
                    color={"error"} 
                    variant="contained"
                    onClick={handlePreviousMonth}
                >
                    先月
                </Button>
                <DatePicker 
                    onChange={handleDateChange}
                    value={currentMonth}
                    label="年月を選択"
                    sx={{ mx: 2, backgroundColor: "white"}} 
                    views={ ["year", "month"]} 
                    format='yyyy/MM' 
                    slotProps={{
                        toolbar: {
                            toolbarFormat: "yyyy年MM月",
                        },
                    }}
                />
                <Button 
                    color={"primary"} 
                    variant="contained"
                    onClick={handleNextMonth}
                >
                    次月
                </Button>
            </Box>
        </LocalizationProvider>
    )
};

export default MonthSelector;