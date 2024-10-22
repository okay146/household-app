import { display } from '@mui/system';
import { plugins } from 'chart.js';
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
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
    const labels = [
        "2024-01-10",
        "2024-01-11",
        "2024-01-12",
        "2024-01-13",
        "2024-01-14",
        "2024-01-15",
    ];
    const data = {
        labels,
        datasets: [
            {
                label: "支出",
                data: [100, 200, 500, 1000, 250, 300],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "収入",
                data: [1000, 20, 570, 1000, 2900, 100],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
};

export default BarChart;