import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {

    // currentDayの初期値に今日の日付を入れる
    // const today = new Date();のままで使うのではなく、formatで形式を決める！
    const today = format(new Date(), "yyyy-MM-dd");
    const [currentDay, setCurrentDay] = useState(today);

    // 選択した日付のデータのみ取得
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });

    return (
        <Box sx={{display: "flex"}}>
            {/* 左側コンテンツ */}
            <Box sx={{flexGrow:1}}>
                <MonthlySummary monthlyTransactions={monthlyTransactions}/>
                <Calender 
                    monthlyTransactions={monthlyTransactions} 
                    setCurrentMonth={setCurrentMonth} 
                    setCurrentDay={setCurrentDay}
                    currentDay={currentDay}
                    today={today}
                />
            </Box>
            {/* 右側コンテンツ */}
            <Box>
                <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} />
                <TransactionForm />
            </Box>
        </Box>
    )
}

export default Home