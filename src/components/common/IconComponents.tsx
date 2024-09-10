import React from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { expenseCategory, incomeCategory } from '../../types';
import HomeIcon from '@mui/icons-material/Home';
import TrainIcon from '@mui/icons-material/Train';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AlarmIcon from '@mui/icons-material/Alarm';
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';

// オブジェクトの中のキーと値の型を定義するからRecordを利用
// キーにはカテゴリ名で、「食費」はすでに別で定義しているからインポート。値となるアイコンはReactのコンポーネントやからJSX.Element。<キー、値>
const IconComponents: Record<incomeCategory | expenseCategory, JSX.Element > = {
    食費: <FastfoodIcon fontSize='small'/>,
    日用品: <AlarmIcon fontSize='small' />,
    住居費: <HomeIcon fontSize='small' />,
    交際費: <Diversity3Icon fontSize='small' />,
    娯楽: <SportsTennisIcon fontSize='small' />,
    交通費: <TrainIcon fontSize='small' />,
    給与: <WorkIcon fontSize='small' />,
    副収入: <AddBusinessIcon fontSize='small' />,
    お小遣い: <SavingsIcon fontSize='small' />,
}

export default IconComponents