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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {IncomeCategory, ExpenseCategory, Transaction} from "../types/index";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import StorefrontIcon from '@mui/icons-material/Storefront';

interface TransactionFormProps {
    onCloseForm: () => void;
    isEntryDrawerOpen: boolean;
    currentDay: string;
    onSaveTransaction: (transaction: Schema) => Promise<void>;
    selectedTransaction: Transaction | null;
    onDeleteTransaction: (TransactionId: string) => Promise<void>;
    setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
    onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}
type IncomeExpense = "income" | "expense";

interface CategoryItem {
    label: IncomeCategory | ExpenseCategory;
    icon: JSX.Element;
}

const TransactionForm = (
    {
        onCloseForm, 
        isEntryDrawerOpen, 
        currentDay, 
        onSaveTransaction, 
        selectedTransaction,
        onDeleteTransaction,
        setSelectedTransaction,
        onUpdateTransaction,
    }: TransactionFormProps) => {
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
        {label: "コンビニ", icon: <StorefrontIcon fontSize="small" />},
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

    const { 
        control, 
        setValue, 
        watch, 
        formState:{errors},
        handleSubmit,
        reset,
    } = useForm<Schema>({
        defaultValues: {
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
        },
        resolver: zodResolver(transactionSchema),
    });
    const incomeExpenseToggle = (type: IncomeExpense) => {
        // フィールドオブジェクトのvalueに値をセット→setValueを使う
        // typeに対して値をセットしたいから引数にtypeを指定。
        setValue("type", type);
        setValue("category", "");
    };
    // 保存ボタン切り替えに使用。収支タイプを監視
    const currentType = watch("type");

    // 収支によって表示するカテゴリを変更。
    // カレントタイプが切り替わるごとにそれに応じたカテゴリを入れる定数を用意する
    useEffect(() => {
        const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
        setCategories(newCategories);
    }, [currentType]);
    

    // 選択した日付に変更
    // 日付を変更したときに処理を実行したいからuseEffectで。
    useEffect(() => {
        setValue("date", currentDay);
    }, [currentDay]);

    // 送信処理
    const onSubmit: SubmitHandler<Schema> = (data) => {
        console.log(data);

        // 更新処理→取引が選択されている場合に実装
        if (selectedTransaction) {
            onUpdateTransaction(data, selectedTransaction.id).then(() => {
                // 非同期処理が完了した後に実装したいからthen
                // console.log("更新しました。");
                // setSelectedTransaction(null);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            // FireStoreにデータを保存する
            onSaveTransaction(data).then(() => {
                console.log("保存しました。");
            }).catch((error) => {
                console.error(error);
            })
        }

        // 送信後フィールドを空にする
        // デフォルト値が「今日の日付」になっているから選択した日付に変更
        reset({ 
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
        });
    }  
    
    // 送信されたタイミングで処理を実装→useEffectを使用
    useEffect(() => {
        if(selectedTransaction) {
            // 取引が選択された場合、
            setValue("type", selectedTransaction.type);
            setValue("date", selectedTransaction.date);
            setValue("amount", selectedTransaction.amount);
            setValue("category", selectedTransaction.category);
            setValue("content", selectedTransaction.content);
        } else {
            reset({
                type: "expense",
                date: currentDay,
                amount: 0,
                category: "",
                content: "",
            })
        }
    }, [selectedTransaction]);

    // 取引内容を削除する
    const handleDelete = () => {
        if(selectedTransaction) {
            onDeleteTransaction(selectedTransaction.id);
            setSelectedTransaction(null);
        }
    }

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
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                        // errorsオブジェクトの中にdateが含まれていればtureになる
                        error={!!errors.date}
                        // エラー内容を表示
                        helperText={errors.date?.message}
                    />
                )}
            />


            {/* カテゴリ */}
            <Controller 
                control={control}
                name="category"
                render={({field}) => (
                <TextField 
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    {...field} 
                    id="カテゴリ" 
                    label="カテゴリ" 
                    select 
                >
                    {categories.map((category, index) => (
                        <MenuItem value={category.label} key={index}>
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
                render={({field}) => {
                    return (
                        <TextField 
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            label="金額" 
                            type="number" 
                            {...field}
                            value={field.value === 0 ? "" : field.value}
                            // 入力された値を数値として扱う
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value, 10) || 0;
                                field.onChange(newValue);
                            }}
                        />
                    )}
                }
            />
            {/* 内容 */}
            <Controller 
                control={control}
                name="content"
                render={({field}) => (
                    <TextField 
                        error={!!errors.content}
                        helperText={errors.content?.message}
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
                {selectedTransaction ? "更新" : "保存"}
            </Button>
            {selectedTransaction && (
                <>
                {/* 削除ボタン */}
                <Button 
                    onClick={handleDelete}
                    variant="outlined" 
                    color={"secondary"} 
                    fullWidth
                >
                    削除
                </Button>
                </>
            )}
            </Stack>
        </Box>
        </Box>
    );
};

export default TransactionForm;
