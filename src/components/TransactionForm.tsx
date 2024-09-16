import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    ListItemIcon,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";
import {IncomeCategory, ExpenseCategory} from "../types/index";
import HomeIcon from '@mui/icons-material/Home';
import TrainIcon from '@mui/icons-material/Train';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AlarmIcon from '@mui/icons-material/Alarm';
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessibilityIcon from '@mui/icons-material/Accessibility';


interface TransactionFormProps {
    onCloseForm: () => void;
    isEntryDrawerOpen: boolean;
    currentDay: string;
}
type IncomeExpense = "income" | "expense";

interface CategoryItem {
    label: IncomeCategory | ExpenseCategory;
    icon: JSX.Element;
}

const TransactionForm = ({onCloseForm, isEntryDrawerOpen, currentDay}: TransactionFormProps) => {
    const formWidth = 320;

    // 支出用カテゴリ
    const expenseCategories: CategoryItem[] = [
        {label: "食費", icon: <FastfoodIcon fontSize="small" />},
        {label: "日用品", icon: <AlarmIcon fontSize="small" />},
        {label: "住居費", icon: <HomeIcon fontSize="small" />},
        {label: "交際費", icon: <Diversity3Icon fontSize="small" />},
        {label: "娯楽", icon: <SportsTennisIcon fontSize="small" />},
        {label: "交通費", icon: <TrainIcon fontSize="small" />},
        {label: "病院", icon: <LocalHospitalIcon fontSize="small" />},
        {label: "その他", icon: <AccessibilityIcon fontSize="small" />},
    ];

    // 収入用カテゴリ
    const incomeCategories: CategoryItem[] = [
        {label: "給与", icon: <WorkIcon fontSize='small' />},
        {label: "副収入", icon: <AddBusinessIcon fontSize='small' />},
        {label: "お小遣い", icon: <SavingsIcon fontSize='small' />},
    ];

    // カテゴリをステートで管理。デフォルトは支出用で。
    const [categories, setCategories] = useState(expenseCategories);

    const { control, setValue, watch } = useForm({
        defaultValues: {
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
        },
    });
    const incomeExpenseToggle = (type: IncomeExpense) => {
        // フィールドオブジェクトのvalueに値をセット→setValueを使う
        // typeに対して値をセットしたいから引数にtypeを指定。
        setValue("type", type);
    };
    // 保存ボタン切り替えに使用。収支タイプを監視
    const currentType = watch("type");

    // 収支によって表示するカテゴリを変更。
    // カレントタイプが切り替わるごとにそれに応じたカテゴリを入れる定数を用意する
    useEffect(() => {
        const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    }, [currentType]);
    

    // 選択した日付に変更
    // 日付を変更したときに処理を実行したいからuseEffectで。
    useEffect(() => {
        setValue("date", currentDay);
    }, [currentDay]);

    return (
        <Box
        sx={{
            position: "fixed",
            top: 64,
            right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
            width: formWidth,
            height: "100%",
            bgcolor: "background.paper",
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: (theme) =>
            theme.transitions.create("right", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            p: 2, // 内部の余白
            boxSizing: "border-box", // ボーダーとパディングをwidthに含める
            boxShadow: "0px 0px 15px -5px #777777",
        }}
        >
        {/* 入力エリアヘッダー */}
        <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography variant="h6">入力</Typography>
            {/* 閉じるボタン */}
            <IconButton
            onClick={onCloseForm}
            sx={{
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        </Box>
        {/* フォーム要素 */}
        <Box component={"form"}>
            <Stack spacing={2}>
            {/* 収支切り替えボタン */}
            <Controller 
                name="type"
                control={control}
                render={({field}) => {
                    return (
                        // 実際に描画する要素を指定
                        <ButtonGroup fullWidth>
                            <Button 
                                // expenseがtrueの場合contained。
                                variant={field.value === "expense" ? "contained" : "outlined"} 
                                color="error" 
                                onClick={() => {incomeExpenseToggle("expense")}}>  
                            支出
                            </Button>
                            <Button 
                                // incomeがtrueの場合contained。
                                variant={field.value === "income" ? "contained" : "outlined"} 
                                onClick={() => {incomeExpenseToggle("income")}}
                            >
                                収入
                            </Button>
                        </ButtonGroup>
                    )
                }}
            />
            {/* 日付 */}
            <Controller 
                control={control}
                name="date"
                render={({field})=> (
                    <TextField
                        {...field}
                        label="日付"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                )}
            />

            {/* カテゴリ */}
            <Controller 
                control={control}
                name="category"
                render={({field}) => (
                <TextField 
                    {...field} 
                    id="カテゴリ" 
                    label="カテゴリ" 
                    select 
                >
                    {categories.map((category) => (
                        <MenuItem value={category.label}>
                        <ListItemIcon>
                            {category.icon}
                        </ListItemIcon>
                            {category.label}
                        </MenuItem>
                    ))}
                </TextField>
                )}
            />
            
            {/* 金額 */}
            <Controller 
                control={control}
                name="amount"
                render={({field}) => (
                    <TextField 
                        label="金額" 
                        type="number" 
                        {...field}
                    />
                )}
            />
            {/* 内容 */}
            <Controller 
                control={control}
                name="content"
                render={({field}) => (
                    <TextField 
                        label="内容" 
                        type="text" 
                        {...field}
                    />
                )}
            />
            {/* 保存ボタン */}
            <Button 
                type="submit" 
                variant="contained" 
                color={currentType === "expense" ? "error" : "primary"} 
                fullWidth
            >
                保存
            </Button>
            </Stack>
        </Box>
        </Box>
    );
};

export default TransactionForm;
