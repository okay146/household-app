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
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";

interface TransactionFormProps {
    onCloseForm: () => void;
    isEntryDrawerOpen: boolean;
    currentDay: string;
}
type IncomeExpense = "income" | "expense";

const TransactionForm = ({onCloseForm, isEntryDrawerOpen, currentDay}: TransactionFormProps) => {
    const formWidth = 320;
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
    // 保存ボタン切り替えに使用。収支タイプを
    const currentType = watch("type");

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
                    <MenuItem value={"食費"}>
                    <ListItemIcon>
                        <FastfoodIcon />
                    </ListItemIcon>
                    食費
                    </MenuItem>
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
