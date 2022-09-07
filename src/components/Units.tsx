import React, {useEffect} from "react";

import TechOp from "./TechOp";
import NoContent from "./NoContent";
import Header from "./Header";

import {useParams} from "react-router-dom";
import axios from "axios";

import "../styles/Units.css";

import axiosInstance from "../utils/axiosAPI";


axios.defaults.withCredentials = true;

interface Infos {
    units: any[],
    loaded: boolean,
    request: boolean
}


export default function Units() {

    const params: any = useParams()

    const URL_API: any = {
        vi: 'api',
        np: 'api2',
        nts320: 'api3'
    }

    const PARAM = URL_API[`${params.id}`]

    const [things, setThings] = React.useState<Infos>({
        units: [],
        loaded: false,
        request: true
    })

    const [operations, setOperations] = React.useState<any[]>([])

    const axiosUnitsRequest = async () => {
        const unitsRequest = await axiosInstance.get(`/${PARAM}/units/`)
        const unitsData = unitsRequest.data.data

        if (unitsRequest.status >= 400) {
            setThings((prev) => {
                return {
                    ...prev,
                    loaded: false
                }
            })
        } else {
            setThings((prev) => {
                return {
                    ...prev,
                    units: unitsData
                }
            })
        }

    }

    const axiosOperationsRequest = async () => {
        const operationsRequest = await axiosInstance.get(`/${PARAM}/operations/`)
        const operationsData = operationsRequest.data.data
        if (operationsRequest.status >= 400) {
            return setThings((prev) => {
                return {
                    ...prev,
                    loaded: false
                }
            })
        } else {
            setOperations(operationsData)
        }

    }

    const axiosData = async () => {
        if (PARAM) {

            await Promise.all([axiosOperationsRequest(), axiosUnitsRequest()])
            return setThings((prev) => {
                return {
                    ...prev,
                    loaded: true
                }
            })

        }
        return setThings((prev) => {
            return {
                ...prev,
                request: false
            }
        })

    }

    let _isMounted = true


    useEffect(() => {

        if (_isMounted) {
            axiosData()
        }

        return () => {
            _isMounted = false
        }

    }, [setOperations, setThings])

    if (!things.request) {
        return (<>
            <NoContent/>
        </>)
    }

    return (

        <div className={"container-units"}>
            <Header/>
            {things.loaded ? <table className={"Datatable"}>
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
                    <tbody className={"Datatable"}>
                    {things.units.map(unit => {

                        const keyName = unit.unit_name + unit.is_productive
                        return (
                            <TechOp key={keyName}
                                    unitInfo={unit} operationsInfo={operations}/>
                        )
                    })}
                    </tbody>

                </table> :

                <div className={'loader-container'}>
                    <div className={'spinner'}/>
                </div>
            }


        </div>
    )
}