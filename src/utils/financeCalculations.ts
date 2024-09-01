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