import React from 'react';
import {
    Button,
} from "@mui/material";

const ExportPdf  = () => {
    const handleExportPdf = () => {
        // console.log("押された！")
    }
    return (
        <>
        <Button 
            onClick={handleExportPdf}
            variant='contained'
            sx={{
                paddingTop: 0.5,
                backgroundColor: "#2196f3", 
                marginBottom: "10px"
            }}
        >
            PDFを出力
        </Button>
        </>
    )
}

export default ExportPdf; 