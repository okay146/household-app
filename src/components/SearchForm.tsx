import React, { useState } from 'react';
import DateCalendar from '../components/common/DateCalendar';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, FormControlLabel, MenuItem, Radio, Stack, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ExportPdf from '../components/Export';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SearchFormSchema } from '../validations/schema';



type SearchFormQuery = {
    onSearch: (query: string) => void;
};

type FormData = {
    amount: number;
    amountComparison: string;
    content: string;
    expenseType?: string;  
    incomeType?: string;    
};

const SearchForm = ({onSearch}: SearchFormQuery) => {
    const handleSearch = () => {
        if (selectedDate) {
            // 日付を文字列に変換して検索クエリとして使用
            const query = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換
            onSearch(query);
        }
        // } else {
        //     alert("日付を選択してください");
        // }
    };
    // タイプ選択
    const [selectType, setSelectType] = useState<string>('all'); 
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectType(event.target.value); // 選択された値をステートに保存
    };

    // デフォルト設定
    // 日付のデフォルト値（例として今日の日付を設定）
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // 支出カテゴリのデフォルト値
    const [expenseCategory, setExpenseCategory] = useState<string>('食費');

    // 収入カテゴリのデフォルト値
    const [incomeCategory, setIncomeCategory] = useState<string>('給与');

    // "以上"/"以下"のデフォルト値
    const [amountComparison, setAmountComparison] = useState<string>('greater');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(SearchFormSchema),
    });


    return (
        <>  
            <div>SearchForm</div>
            <Accordion
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        backgroundColor: "#2196f3", 
                        borderRadius: "5px 5px 0 0",
                        fontWeight: "bold",
                        color: "white"
                    }}
                >
                    検索条件
                </AccordionSummary>
                <AccordionDetails>
                    <Stack
                        direction="column"
                    >
                        <DateCalendar />
                        <Stack 
                            direction="row"
                            marginTop="10px"
                            sx={{ height: "60px"}}
                        >
                            <FormControlLabel
                                control={
                                    <Radio 
                                        value="all" 
                                        checked={selectType === 'all'} 
                                        onChange={handleChangeType} 
                                    />
                                }
                                label="全て" 
                            />
                            <FormControlLabel
                                control={
                                    <Radio 
                                        value="expense" 
                                        checked={selectType === 'expense'} 
                                        onChange={handleChangeType} 
                                    />
                                }
                                label="支出" 
                            />
                            <FormControlLabel 
                                control={
                                    <Radio 
                                        value="income" 
                                        checked={selectType === 'income'} 
                                        onChange={handleChangeType} 
                                    />
                                }
                                label="収入" 
                            />
                            {selectType === "expense" && (
                                <TextField
                                    select
                                    name='expenseType'
                                    sx={{ 
                                        width: "16em", 
                                        padding:"0",
                                        height: "55px",  
                                    }}
                                    error={!!errors.expenseType}
                                    helperText={errors.expenseType?.message}
                                    label="カテゴリ"
                                    required
                                    value={expenseCategory}
                                    onChange={(e) => setExpenseCategory(e.target.value)}
                                >
                                    <MenuItem value="食費">食費</MenuItem>
                                    <MenuItem value="日用品">日用品</MenuItem>
                                    <MenuItem value="住居費">住居費</MenuItem>
                                    <MenuItem value="交際費">交際費</MenuItem>
                                    <MenuItem value="娯楽">娯楽</MenuItem>
                                    <MenuItem value="交通費">交通費</MenuItem>
                                    <MenuItem value="病院">病院</MenuItem>
                                    <MenuItem value="コンビニ">コンビニ</MenuItem>
                                    <MenuItem value="その他">その他</MenuItem>
                                </TextField>
                            )}
                            {selectType === "income" && (
                                <TextField
                                    select
                                    name='incomeType'
                                    sx={{ 
                                        width: "16em", 
                                        padding:"0",
                                        height: "55px",  
                                        '& .MuiInputBase-root': {
                                            height: "55px",  
                                        },
                                    }}
                                    label="カテゴリ"
                                    required
                                    value={incomeCategory}
                                    onChange={(e) => setIncomeCategory(e.target.value)}
                                >
                                    <MenuItem value="給与">給与</MenuItem>
                                    <MenuItem value="副収入">副収入</MenuItem>
                                    <MenuItem value="お小遣い">お小遣い</MenuItem>
                                </TextField>
                            )}
                        </Stack>
                        <Stack 
                            direction="row" 
                            alignItems="center"
                            sx={{ height: "60px", marginTop: "10px"}}
                        >
                            <TextField
                                // name="amount"
                                sx={{ 
                                    width: "16em", 
                                    padding:"0",
                                    height: "60px",  
                                    '& .MuiInputBase-root': {
                                        height: "55px",  
                                    },
                                }}
                                label="金額"
                                type='number'
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                                {...register("amount")}
                            >
                                金額
                            </TextField>
                            <Typography sx={{ margin: "8px"}}>円</Typography>
                            <TextField
                                name="amountComparison"
                                select
                                sx={{ 
                                    width: "8em", 
                                    padding:"0",
                                    height: "60px",  
                                    '& .MuiInputBase-root': {
                                        height: "55px",  
                                    },
                                }}
                                value={amountComparison}
                                onChange={(e) => setAmountComparison(e.target.value)}

                            >
                                <MenuItem value="greater">以上</MenuItem>
                                <MenuItem value="less">以下</MenuItem>
                            </TextField>
                        </Stack>
                        <TextField
                            name="content"
                            label="内容"
                            sx={{width: "30em", marginTop: "10px"}}
                            multiline
                            rows={2}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            width: "30px", 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            margin: "2px 3em auto auto",
                        }}
                    >
                        <Button
                            variant='contained'
                            sx={{
                            backgroundColor: "#2196f3",
                            }}
                        >
                            検索
                        </Button>
                    </Stack>
                </AccordionDetails>
                <AccordionActions>
                    
                </AccordionActions>
            </Accordion>
            <ExportPdf />
            <DataGrid 
                rows={rows}
                columns={columns}
                checkboxSelection
                hideFooter
                sx={{ height: "400px"}}
            />
        </>
    )
};


const rows = [
    { id: 1, date: '2024-09-28', type: '収入', category: '給料', amount: 50000, content: '9月の給料' },
    { id: 2, date: '2024-09-29', type: '支出', category: '食費', amount: 3000, content: 'ランチ' },
];

const columns: GridColDef[] = [
    {
        field: "date",
        headerName: "取引日付",
        width: 150,
    },
    {
        field: "type",
        headerName: "取引内容",
        width: 150,
    },
    {
        field: "category",
        headerName: "カテゴリ",
        width: 200,
    },
    {
        field: "amount",
        headerName: "金額",
        width: 200,
    },
    {
        field: "content",
        headerName: "内容",
        width: 430,
    },
]

export default SearchForm;