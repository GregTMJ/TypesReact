import factoryTimeZone from "../utils/factoryTimeZone";
import msToTimeString from "../utils/msToTimeString";

export default function techResultTable(ResponseData: any[], machineName: string, unit_ref: number, productivity: number): void {

    let result: any[] = []

    let factoryTime: any = factoryTimeZone()

    setTimeout(() => {
        const tableData = ResponseData


        let all_tubes: number = 0;
        let good_tubes: number = 0;
        let bad_tubes: number = 0;
        let timeDifference: number = 0;

        let machineRow: any = document.getElementById(`row ${unit_ref}`)
        let row = "";
        machineRow.innerHTML = row;

        try {
            row += '<td>' + machineName + '</td>';
            if (tableData.length) {
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].unitref === unit_ref) {
                        result.push(tableData[i])
                    }
                }
            }

            // если у нас имеются данные для участка
            if (result.length) {

                // Смотрим какой был простой у первой трубы с момента начала работы смены

                const firstElement = result[0];
                const firstElementTime: any = new Date(firstElement.optime);

                if (firstElementTime - factoryTime > 300000) {
                    timeDifference += firstElementTime - factoryTime
                }

                all_tubes += 1;

                if (firstElement.opresult === 1) {
                    good_tubes += 1;
                } else {
                    bad_tubes += 1;
                }

                if (result.length > 1) {
                    // Проверяем есть ли у нас больше чем один результат
                    for (let i = 1; i < result.length; i++) {

                        // Время совершённой операции уникальным участком
                        let techTime: any = new Date(result[i].optime)

                        // Значение следующей точки записываем в начальной
                        factoryTime = new Date(result[i - 1].optime)


                        // Если разница превышает 5 мин, то добавляем к простою
                        if (techTime - factoryTime > 300000) {
                            timeDifference += techTime - factoryTime
                        }

                        // Добавляем трубу к счётчику
                        all_tubes += 1;
                        if (result[i]['opresult'] === 1) {
                            // Годная труба
                            good_tubes += 1;
                        } else {
                            // Брак
                            bad_tubes += 1;
                        }
                    }
                }

                // Смотрим какой застой между последней операции и текущим временем
                const currentTime = new Date()
                const currentFactoryTime:any = new Date(currentTime.toLocaleString('en-US',
                    {timeZone: 'Indian/Maldives'}))

                const lastElement = result[result.length - 1]
                const lastElementTime:any = new Date(lastElement.optime)


                if (currentFactoryTime - lastElementTime > 300000) {
                    timeDifference += currentFactoryTime - lastElementTime
                }

            } else {

                // Если у нас не было никаких результатов для участка, то просто смотрим какой простой между текущим
                // временем и начало смены
                const currentTime = new Date()
                const currentFactoryTime:any = new Date(currentTime.toLocaleString('en-US',
                    {timeZone: 'Indian/Maldives'}))

                timeDifference += currentFactoryTime - factoryTime
            }

            row += '<td>' + all_tubes + '</td>';
            row += '<td>' + good_tubes + '</td>';
            row += '<td>' + bad_tubes + '</td>';
            row += '<td>' + productivity + '</td>';
            row += '<td>' + msToTimeString(timeDifference) + '</td>';


            machineRow.innerHTML += row;
        } catch (e) {
            console.log("error occurred")
        }


    }, 500)
}







