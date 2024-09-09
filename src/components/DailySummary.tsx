import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import { theme } from "../theme/theme"; 

interface DailySummaryProps {
    dailyTransactions: Transaction[];
    columns: number;
}

const DailySummary = () => {
    return (
    <Box>
        <Grid container spacing={2}>
        {/* 収入 */}
        <Grid item xs={6} display={"flex"}>
            <Card
                sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
            >
            <CardContent>
                <Typography variant="body2" noWrap textAlign="center">
                収入
                </Typography>
                <Typography
                    sx={{ color: (theme) => theme.palette.incomeColor.main, wordBreak: "break-all" }}
                    textAlign="right"
                    fontWeight="fontWeightBold"
                >
                ¥500
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        {/* 支出 */}
        <Grid item xs={6} display={"flex"}>
            <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
            >
            <CardContent>
                <Typography variant="body2" noWrap textAlign="center">
                支出
                </Typography>
                <Typography
                    sx={{ color: (theme) => theme.palette.expenseColor.main, wordBreak: "break-all" }}
                    textAlign="right"
                    fontWeight="fontWeightBold"
                >
                ¥300
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        {/* 残高 */}
        <Grid item xs={12} display={"flex"}>
            <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
            >
            <CardContent>
                <Typography variant="body2" noWrap textAlign="center">
                残高
                </Typography>
                <Typography
                    textAlign="right"
                    fontWeight="fontWeightBold"
                    sx={{ color: (theme) => theme.palette.balanceColor.main, wordBreak: "break-all" }}
                >
                ¥200
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        </Grid>
    </Box>
    );
};
export default DailySummary;
