import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface CSVData {
    csvData:string[][]
    filename:string
}

const ExportCSV = ({csvData, filename}:CSVData) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData:any, fileName:string | null) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className={'exportCSV'} onClick={(e) => exportToCSV(csvData,filename)}>Экспорт</button>
    )
}

export default ExportCSV;