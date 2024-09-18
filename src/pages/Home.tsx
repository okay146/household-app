import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
    onSaveTransaction: (transaction: Schema) => Promise<void>;
}

const Home = ({monthlyTransactions, setCurrentMonth, onSaveTransaction}: HomeProps) => {

    // currentDayの初期値に今日の日付を入れる
    // const today = new Date();のままで使うのではなく、formatで形式を決める！
    const today = format(new Date(), "yyyy-MM-dd");
    const [currentDay, setCurrentDay] = useState(today);

    // 選択した日付のデータのみ取得
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });

    // 開閉状態を管理する
    const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
    const closeForm = () => {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
    // フォームの開閉処理
    const handleAddTransactionForm = () => {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }

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
                <TransactionMenu 
                    dailyTransactions={dailyTransactions} currentDay={currentDay} 
                    onAddTransactionForm={handleAddTransactionForm}
                />
                <TransactionForm 
                    currentDay={currentDay} 
                    onCloseForm={closeForm}
                    isEntryDrawerOpen={isEntryDrawerOpen}
                    onSaveTransaction={onSaveTransaction}
                />
            </Box>
        </Box>
    )
}

export default Home