import React, {useEffect} from "react";

import TechOp from "./TechOp";
import "../styles/Units.css";

import Operations from "../axiosRequests/axiosRequests";

const unitsOperations = new Operations()

export default function Units() {

    const [units, setUnits] = React.useState<any[]>([])
    const [operations, setOperations] = React.useState<any[]>([])


    const axiosUnitsRequest = async () => {
        const unitsRequest = await unitsOperations.getUnits()
        const unitsData = unitsRequest.data.data
        setUnits(unitsData)
    }

    const axiosOperationsRequest = async () => {
        const operationsRequest = await unitsOperations.getFullOperations()
        const operationsData = operationsRequest.data.data
        setOperations(operationsData)
    }

    const axiosData = async () => {
        await Promise.all([axiosOperationsRequest(), axiosUnitsRequest()])
    }

    let _isMounted = true


    useEffect(() => {

        if(_isMounted) {
            axiosData()
        }


        return () => {
            _isMounted = false
        }

    }, [setOperations, setUnits])


    return (
        <div className={"main-content"}>

            <table className={"Datatable"}>
                <thead>
                <tr>
                    <th>
                        Название установки
                    </th>
                    <th>
                        Общее количество труб
                    </th>
                    <th>
                        Количество годных труб
                    </th>
                    <th>
                        Количество брака
                    </th>
                    <th>
                        Производительность (шт./ч)
                    </th>
                    <th>
                        Суммарное время простоя
                    </th>
                </tr>
                </thead>
                <tbody>
                {units.map(unit => {

                    const keyName = unit.unit_name + unit.is_productive
                    return (
                        <TechOp key={keyName}
                                unitInfo={unit} operationsInfo={operations}/>
                    )
                })}
                </tbody>

            </table>

        </div>
    )
}