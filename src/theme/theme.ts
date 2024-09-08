import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

// カスタムカラーを作る場合型を拡張する！
declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
    }
    // 初期カラー
    // ?をつけることで初期カラーが設定されていなくてもOKになる
    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
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
    }
});