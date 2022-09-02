import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import ExportCSV from "./ExportCSV";

import "../styles/ShiftInfo.css"
import "react-datepicker/dist/react-datepicker.css"

import shiftInfoTable from "../tableFormatOperations/shiftInfoTable";
import {useParams} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import NoContent from "./NoContent";


const ShiftInfo = () => {

    const params: any = useParams()

    const URL_API: any = {
        vi: 'api',
        np: 'api2',
        nts320: 'api3'
    }

    const PARAM = URL_API[`${params.id}`]
    const BASE_URL = `http://192.100.1.50:7000/${PARAM}`

    const getShiftInfo = (URL: string, pk: string) => {
        const full_URL = `${URL}/shift/${pk}`
        return axios.get(full_URL)
    }


    const [chosenDate, setChosenDate] = useState<any>(new Date())
    const [chosenShift, setChosenShift] = useState<number>(1)
    const [loaded, setLoaded] = useState<boolean>(true)

    let cvsData: string[][] = [
        ["Дата", "Смена", "Вход", "% брака", "Выход"]
    ]


    const getShiftRequestResult = async (URLSent: string, selectedDate: string, selectedShift: number) => {
        const response = await getShiftInfo(BASE_URL, URLSent)
        if (response.status > 400) {
            alert("на данный запрос нет данных!")
        } else {
            const responseData = response.data.data
            const badTubes: number = Math.round((1 - (responseData.exit_tubes / responseData.enter_tubes)) * 1000) / 10
            const badTubes_2: number = Math.round((1 - (responseData.exit_line2 / responseData.enter_line2)) * 1000) / 10
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

        await getShiftRequestResult(sentURL, getSelectedDate, chosenShift)


    }


    useEffect(() => {
        if (!PARAM) {
            setLoaded(false)
        }
    })

    if (!loaded) {
        return (<>
            <NoContent/>
        </>)
    }

    return (
        <div className={"container-shift"}>
            <Header/>
            <div className={"shift-items"}>
                <div className={"shift-labels"}>
                    <label className={'labels'}>Выберите дату
                        <DatePicker
                            id={'datepicker'}
                            selected={chosenDate}
                            onChange={(date: any) => setChosenDate(date)}
                        />
                    </label>

                    <label className={'labels'}>Выберите смену
                        <select id={'shiftSelect'} className={'selection-option'} defaultValue={'Выберите смену'}
                                onChange={(e: any) => setChosenShift(e.target.value)}>
                            <option key={1} value={1}>Первая Смена</option>
                            <option key={2} value={2}>Вторая Смена</option>
                        </select>
                    </label>
                </div>


                <button className="btn35 btn60" onClick={handleSubmit}>Показать данные</button>


                <div>
                    <table className={"shiftInfoTable"}>
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
                        <tbody className={"Datatable"} id={"tbody-content"}/>

                    </table>

                    <ExportCSV csvData={cvsData} filename={`Данные за ${chosenDate}`}/>
                </div>

            </div>
        </div>
    )
}
export default ShiftInfo;