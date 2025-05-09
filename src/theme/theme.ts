import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { amber, blue, blueGrey, cyan, deepOrange, green, lightBlue, lightGreen, lime, pink, purple, red, yellow } from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

// カスタムカラーを作る場合型を拡張する！
declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }
    // 初期カラー
    // ?をつけることで初期カラーが設定されていなくてもOKになる
    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
        incomeCategoryColor?: Record<IncomeCategory, string>;
        expenseCategoryColor?: Record<ExpenseCategory, string>;
    }

}


export const theme = createTheme({
    // アプリ全体に共通させる文字の設定
    typography: {
        fontFamily: 'Noto Sans JP , Roboto, Arial, sans-serif', 
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    // アプリ全体に共通させる色の設定
    palette: {
        // カスタムカラーを作る場合型を拡張する！
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        },
        // 収入用円
        incomeCategoryColor : {
            給与: lightBlue[500],
            副収入: cyan[200],
            お小遣い: lightGreen['A700'],
        },
        // 支出用
        expenseCategoryColor : {
            食費: deepOrange[500],
            日用品: lightGreen[500],
            住居費: amber[500],
            交際費: pink[300],
            娯楽: cyan[200],
            交通費: purple[400],
            病院: lime[500],
            コンビニ: yellow[500],
            その他: blueGrey[500],
        }


    }
});