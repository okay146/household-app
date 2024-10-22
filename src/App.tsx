import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import Export from './pages/Export';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';


function App() {
  // firestoreのエラーの内容を型指定。
  function isFireStoreError(error: unknown):error is {code: string, message: string} {
    return typeof error === "object" && error !== null && "code" in error // objectで、errorがnullではなく、codeを含む場合(=trueの場合、エラー内容は{code: string, message: string} )
  } 
  // 取得したデータを配列に入れる
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  // 今月のデータを取得 new Dateで今日の日付を取得
  const [currentMonth, setCurrentMonth] = useState(new Date());
  console.log(currentMonth);
  format(currentMonth, "yyyy-MM");


  //初回レンダリングのみ、1回だけデータを取得したい。データの取得はエラーが起こるかもしれないからtry-catchで。
  useEffect(() => {
    // useEffectにはasyncはつけられないから関数で囲む
    const fetchTransactions = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, "Transactions"));
      const transactionsData = querySnapshot.docs.map((doc) => {
        // console.log(doc.id, " => ", doc.data());
        return {
          ...doc.data(),
          id: doc.id,
        } as Transaction
      });
      console.log(transactionsData);
      setTransactions(transactionsData);
    } catch (error) {
      // 通常のエラーか、Firestoreのエラーか判断
      if(isFireStoreError(error)) {
        console.error("firebaseのエラーは", error)
        console.error("firebaseのエラーは", error.message)
        console.error("firebaseのエラーは", error.code)
      } else {
        console.error("一般的なエラーは", error)
      }
    }
  }
  fetchTransactions();
  }, []);

  // 同じ月のデータをフィルタリング
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  });

  // 取引を保存する
  const handleSaveTransaction = async(transaction: Schema) => {
    // 非同期で処理を行うからtry-catch。
    try {
      // データを保存
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);
      
      // データをすぐに反映させるためにステートで管理
      const newTransaction = {
        id: docRef.id,
        // 他の情報はスプレッド構文で展開
        ...transaction,
      } as Transaction
      // setTransactions([...transactions, newTransaction]);
      // 上としたは同じ意味。下の形が推奨。直前の値を〜
      setTransactions((prevTransaction) => [
        ...prevTransaction, newTransaction
      ])
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firebaseのエラーは", err)
      } else {
        console.error("一般的なエラーは", err)
      }
    }
  };

  // 削除処理
  const handleDeleteTransaction = async(transactionId: string) => {
    try {
      // filestoreのデータを全て削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      // 削除ボタンを押された取引以外の取引情報を取得
      const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(filterdTransactions);
    } catch (error){
      // 通常のエラーか、Firestoreのエラーか判断
      if(isFireStoreError(error)) {
        console.error("firebaseのエラーは", error)
        console.error("firebaseのエラーは", error.message)
        console.error("firebaseのエラーは", error.code)
      } else {
        console.error("一般的なエラーは", error)
      }
    }

  }

  // 更新処理
  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    try {
      // firestoreの更新処理
      const docRef = doc(db, "Transactions", transactionId);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);
      // フロント更新
      // 更新対象のidと一致している場合その取引内容を更新する
      const updatedTransactions = transactions.map((t) => t.id === transactionId ? {...t, ...transaction} : t) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (error) {
      // 通常のエラーか、Firestoreのエラーか判断
      if(isFireStoreError(error)) {
        console.error("firebaseのエラーは", error)
        console.error("firebaseのエラーは", error.message)
        console.error("firebaseのエラーは", error.code)
      } else {
        console.error("一般的なエラーは", error)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
    {/* リセットCSSのようなもの */}
    <CssBaseline />
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route 
            index 
            element={
              <Home 
                monthlyTransactions={monthlyTransactions} 
                setCurrentMonth={setCurrentMonth} 
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />}
            />
          <Route 
            path="/report" 
            element={
              <Report 
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                />
            } 
          />
          <Route path="/export" element={<Export />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
