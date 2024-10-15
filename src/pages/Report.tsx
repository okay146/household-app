import { Grid, Paper } from '@mui/material';
import { display, height } from '@mui/system';
import React from 'react';
import MonthSelector from '../components/MonthSelector';
import CategoryChart from '../components/CategoryChart';
import TransactionTable from '../components/TransactionTable';
import BarChart from '../components/BarChart';

interface ReportProps {
    currentMonth: Date;
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Report = ({currentMonth, setCurrentMonth}: ReportProps) => {
    const commonPaperStyle = {
        height: { xs: "auto", md: "400px"},
        display: "flex",
        flexDirection: "column",
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {/* 日付 */}
                <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
            </Grid>
            <Grid item xs={12} md={4}>
                {/* カテゴリフラグ */}
                <Paper sx={commonPaperStyle}><CategoryChart /></Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                {/* 棒グラフ */}
                <Paper sx={commonPaperStyle}><BarChart /></Paper>
            </Grid>
            <Grid item xs={12}>
                {/* テーブル */}
                <TransactionTable />
            </Grid>
        </Grid>
    )
}

export default Report;