import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const MyForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');
  const [textFieldValue, setTextFieldValue] = useState('');
  
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDialogSubmit = () => {
    setTextFieldValue(dialogValue); // ダイアログの入力値を元のテキストフィールドに設定
    setOpen(false);
  };

  return (
    <div>
      {/* 元のテキストフィールド */}
      <TextField
        label="元のフィールド"
        value={textFieldValue}
        fullWidth
        InputProps={{
          style: { color: textFieldValue ? 'red' : 'black' }, // 入力があったときだけ赤字にする
        }}
      />

      {/* ダイアログを開くボタン */}
      <Button variant="contained" onClick={handleOpenDialog} style={{ marginTop: '16px' }}>
        ダイアログを開く
      </Button>

      {/* ダイアログ */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>入力してください</DialogTitle>
        <DialogContent>
          <TextField
            label="ダイアログフィールド"
            fullWidth
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleDialogSubmit} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyForm;
