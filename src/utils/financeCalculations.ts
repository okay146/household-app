import { Balance, Transaction } from "../types";

// データが入ったtransactionsとその型を指定
export function financeCalculations(transactions: Transaction[]): Balance{
    // reduceは繰り返し処理。引数を2つ指定。acc(累計値)と、transactions(処理中の要素)
    // accは初期値が設定できる
    return transactions.reduce((acc, transaction) => {
        if(transaction.type == "income"){
            // もし処理中の要素のtypeがincomeの場合、現在の要素の金額を足す
            acc.income += transaction.amount
        } else {
            // 支出の計算
            acc.expense += transaction.amount
        }
        // 残高は収入-支出
        acc.balance = acc.income - acc.expense;
        // accを返す
        return acc;
    }, {income:0, expense: 0, balance: 0})
}

// 日付ごとの収支を計算する関数
export function calculateDailyBalance(transactions: Transaction[]):Record<string, Balance> {
    // accには初期値、
    return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
        // 現状の日付の情報をdayに代入
        const day = transaction.date;
        if(!acc[day]) { 
            acc[day] = {income: 0, expense: 0, balance: 0}
        }
        
        if(transaction.type === "income") {
            // 収入の場合
            acc[day].income  += transaction.amount
        } else {
            // 支出の場合
            acc[day].expense  += transaction.amount
        }
        // 残高
        acc[day].balance = acc[day].income - acc[day].expense

        return acc
    }, {})
}