import { display, useTheme } from '@mui/system';
import { ChartData, plugins } from 'chart.js';
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Transaction } from '../types';
import { calculateDailyBalance } from '../utils/financeCalculations';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    monthlyTransactions: Transaction[];
}
const BarChart = ({
    monthlyTransactions
}: BarChartProps) => {
    const theme = useTheme();
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "日別収支",
            },
        },
    };

    const dailyBalances = calculateDailyBalance(monthlyTransactions);

    const dateLabels = Object.keys(dailyBalances).sort();
    const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
    const incomeData = dateLabels.map((day) => dailyBalances[day].income);

    const data: ChartData<"bar"> = {
        labels: dateLabels,
        datasets: [
            {
                label: "支出",
                data: expenseData,
                backgroundColor: theme.palette.expenseColor.light,
            },
            {
                label: "収入",
                data: incomeData,
                backgroundColor: theme.palette.incomeColor.light,
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
};

export default BarChart;