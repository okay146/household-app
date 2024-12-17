import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowParams, GridToolbarContainer } from '@mui/x-data-grid';
import { Button, Checkbox, Stack } from '@mui/material';

const Test = () => {
    const [rows, setRows] = useState(dummydata);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [checkedRows, setCheckedRows] = useState<number[]>([]);

    const handleRowClick = (params: GridRowParams) => {
        setSelectedRowId(params.id as number);
    };

    const handleCheckboxChange = (id: number) => {
        setCheckedRows((prevCheckedRows) =>
            prevCheckedRows.includes(id)
                ? prevCheckedRows.filter((rowId) => rowId !== id)
                : [...prevCheckedRows, id]
        );
    };

    const handleMoveUp = () => {
        if (selectedRowId === null) return;

        const rowIndex = rows.findIndex((row) => row.id === selectedRowId);
        if (rowIndex > 0) {
            const newRows = [...rows];
            const temp = newRows[rowIndex];
            newRows[rowIndex] = newRows[rowIndex - 1];
            newRows[rowIndex - 1] = temp;
            setRows(newRows);
        }
    };

    const handleMoveDown = () => {
        if (selectedRowId === null) return;

        const rowIndex = rows.findIndex((row) => row.id === selectedRowId);
        if (rowIndex < rows.length - 1) {
            const newRows = [...rows];
            const temp = newRows[rowIndex];
            newRows[rowIndex] = newRows[rowIndex + 1];
            newRows[rowIndex + 1] = temp;
            setRows(newRows);
        }
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setCheckedRows(rows.map((row) => row.id));
        } else {
            setCheckedRows([]);
        }
    };

    const columns: GridColDef[] = [
        {
            field: "checkbox",
            headerName: "",
            width: 50,
            sortable: false,
            headerClassName: "header-checkbox",
            renderHeader: () => (
                <Checkbox
                    checked={checkedRows.length === rows.length && rows.length > 0}
                    indeterminate={checkedRows.length > 0 && checkedRows.length < rows.length}
                    onChange={handleSelectAll}
                />
            ),
            renderCell: (params) => (
                <Checkbox
                    checked={checkedRows.includes(params.id as number)}
                    onChange={() => handleCheckboxChange(params.id as number)}
                />
            ),
        },
        { field: "date", headerName: "取引日付", width: 150, sortable: false },
        { field: "type", headerName: "取引内容", width: 150, sortable: false },
        { field: "category", headerName: "カテゴリ", width: 200, sortable: false },
        { field: "amount", headerName: "金額", width: 200, sortable: false },
        { field: "content", headerName: "内容", width: 430, sortable: false },
    ];

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                <Button variant="contained" onClick={handleMoveUp} disabled={selectedRowId === null}>↑</Button>
                <Button variant="contained" onClick={handleMoveDown} disabled={selectedRowId === null}>↓</Button>
            </Stack>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                sx={{ height: "400px" }}
                onRowClick={handleRowClick}
                getRowClassName={(params) =>
                    params.id === selectedRowId ? 'selected-row' : ''
                }
                checkboxSelection={false}
            />
        </>
    );
};

const dummydata = [
    { id: 1, date: '2024-09-28', type: '収入', category: '給料', amount: 50000, content: '9月の給料' },
    { id: 2, date: '2024-09-29', type: '支出', category: '食費', amount: 3000, content: 'スーパーでの買い物' },
    { id: 3, date: '2024-09-30', type: '収入', category: '副業', amount: 10000, content: 'フリーランスの報酬' },
];
export default Test;
