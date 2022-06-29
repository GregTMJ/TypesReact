import React, {useState} from "react";
import DatePicker from "react-datepicker";

import ExportCSV from "./ExportCSV";

import "../styles/ShiftInfo.css"
import "react-datepicker/dist/react-datepicker.css"

import shiftInfoTable from "../tableFormatOperations/shiftInfoTable";
import Operations from "../axiosRequests/axiosRequests";

const shiftInformation = new Operations()

const ShiftInfo = () => {

    const [chosenDate, setChosenDate] = useState<any>(new Date())
    const [chosenShift, setChosenShift] = useState<number>(1)

    let cvsData:string[][] = [
        ["Дата", "Смена", "Вход", "% брака", "Выход"]
    ]


    const getShiftRequestResult = async (URLSent: string, selectedDate: string, selectedShift: number) => {
        const response = await shiftInformation.getShiftInfo(URLSent)
        if (response.status > 400) {
            alert("на данный запрос нет данных!")
        } else {
            const responseData = response.data.data
            const badTubes:number = Math.round((1 - (responseData.exit_tubes / responseData.enter_tubes)) * 1000) / 10
            const badTubes_2:number = Math.round((1 - (responseData.exit_line2 / responseData.enter_line2)) * 1000) / 10
            const AddedValues = [selectedDate, selectedShift, responseData.enter_tubes, badTubes, responseData.exit_tubes]
            const secondLineValues = [selectedDate, selectedShift, responseData.enter_line2, badTubes_2, responseData.exit_line2]

            cvsData.push(AddedValues)
            cvsData.push(secondLineValues)

            await shiftInfoTable(selectedDate, selectedShift, responseData)
        }


    }

    const handleSubmit = async () => {
        const getSelectedDay = ("0" + chosenDate.getDate()).slice(-2)
        const getSelectedMonth = ("0" + (chosenDate.getMonth() + 1)).slice(-2)
        const getSelectedYear = chosenDate.getFullYear()
        const getSelectedDate = `${getSelectedYear}-${getSelectedMonth}-${getSelectedDay}`
        const sentURL = `${chosenShift}_${getSelectedDate}`
        // console.log(chosenShift)
        await getShiftRequestResult(sentURL, getSelectedDate, chosenShift)
    }

    return (
        <div className={"shiftInfo"}>
            <div className={"shiftForm"}>
                <div className={'pickers'}>
                    <label htmlFor={'datepicker'} className={'shiftLabel'}>Выберите дату</label>
                    <DatePicker
                        id={'datepicker'}
                        selected={chosenDate}
                        onChange={(date: any) => setChosenDate(date)}
                    />
                </div>
                <div className={'pickers'}>
                    <label htmlFor={'shiftSelect'} className={'shiftLabel'}>Выберите смену</label>

                    <select id={'shiftSelect'} className={'selection-option'} defaultValue={'Выберите смену'}
                            onChange={(e: any) => setChosenShift(e.target.value)}>
                        <option key={1} value={1}>Первая Смена</option>
                        <option key={2} value={2}>Вторая Смена</option>
                    </select>
                </div>


                <button className="shiftButton" onClick={handleSubmit}>Показать данные</button>

            </div>


            <div className={'tableInfo'}>
                <table className={"shiftTable"}>
                    <thead>
                    <tr>
                        <th>
                            Дата
                        </th>
                        <th>
                            Смена
                        </th>
                        <th>
                            Вход
                        </th>
                        <th>
                            % брака
                        </th>
                        <th>
                            Годная
                        </th>
                    </tr>
                    </thead>
                    <tbody className={"table-tbody"} id={"tbody-content"}/>

                </table>

                <ExportCSV csvData={cvsData} filename={`Данные за ${chosenDate}`}/>
            </div>

        </div>
    )
}
export default ShiftInfo;