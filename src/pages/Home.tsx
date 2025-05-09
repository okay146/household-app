import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'
import MyForm from './Practice '

interface HomeProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
    onSaveTransaction: (transaction: Schema) => Promise<void>;
    onDeleteTransaction: (transactionId: string) => Promise<void>;
    onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}


const Home = (
    {
        monthlyTransactions, 
        setCurrentMonth, 
        onSaveTransaction,
        onDeleteTransaction,
        onUpdateTransaction,
    }: HomeProps) => {

    // currentDayの初期値に今日の日付を入れる
    // const today = new Date();のままで使うのではなく、formatで形式を決める！
    const today = format(new Date(), "yyyy-MM-dd");
    const [currentDay, setCurrentDay] = useState(today);

    // 選択されたデータを管理
    // 何も選択されていない場合はnullを許容するためnullを初期値に指定
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    // 選択した日付のデータのみ取得
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });

    // 開閉状態を管理する
    const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
    const closeForm = () => {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
        // 閉じるボタンを押した時点で内容をnullに
        setSelectedTransaction(null);
    }
    // フォームの開閉処理
    const handleAddTransactionForm = () => {
        // 取引内容が選択された場合、内容をリセット(開閉処理なし)
        if(selectedTransaction) {
            // 内容をリセット
            setSelectedTransaction(null);
        } else {
            // 開閉
            setIsEntryDrawerOpen(!isEntryDrawerOpen);
        }

    }

    // 取引が選択された時の処理
    const handleSelectTransaction = (transaction: Transaction) => {
        // 選択されたデータをステートで管理
        setSelectedTransaction(transaction);
        setIsEntryDrawerOpen(true);

    }
    return (
        <>
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
                    onSelectTransaction={handleSelectTransaction}
                />
                <TransactionForm 
                    currentDay={currentDay} 
                    onCloseForm={closeForm}
                    isEntryDrawerOpen={isEntryDrawerOpen}
                    onSaveTransaction={onSaveTransaction}
                    selectedTransaction={selectedTransaction}
                    onDeleteTransaction={onDeleteTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    onUpdateTransaction={onUpdateTransaction}
                />
            </Box>
        </Box>

        {/* <MyForm /> */}
        </>
    )
}

export default Home