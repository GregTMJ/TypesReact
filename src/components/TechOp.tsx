import React, {useEffect, useState} from "react";
import techResultTable from "../tableFormatOperations/techResultTable";


interface enumUnitInfo {
    unitInfo: {
        id: number,
        unit_name: string,
        unit_plan: number,
        online_accessible: boolean,
        unit_ref: number,
        is_productive: number,
        total_treated_tubes: number,
        unitref: number
    },
    operationsInfo: any[],
}

export default function TechOp({unitInfo, operationsInfo}: enumUnitInfo) {

    const [loaded, setLoaded] = useState<boolean>(false)


    useEffect(() => {
        let _isMounted = false
        const getTableData = async () => {
            _isMounted = true
            if (_isMounted) {
                await techResultTable(operationsInfo, unitInfo.unit_name, unitInfo.unit_ref, unitInfo.is_productive)
                await setLoaded(true)
            }
        }
        getTableData()
        return () => {
            _isMounted = false
        }

    }, [setLoaded])


    if (loaded) {
        return (
            <tr id={`row ${unitInfo.unit_ref}`}>

            </tr>
        )
    } else {
        return (
            <tr>

            </tr>
        )
    }

}