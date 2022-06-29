interface ReceivedData {
    enter_tubes: number,
    factory_bad_tubes: number,
    exit_tubes: number,
    enter_line2: number,
    exit_line2: number
}


export default function shiftInfoTable(selectedDate: string | null, selectedShift: number, receivedData: ReceivedData) {
    setTimeout(() => {

        let table: any = document.getElementById("tbody-content");
        let k = "";
        table.innerHTML = k;

        const percentage = Math.round((1 - (receivedData.exit_tubes / receivedData.enter_tubes)) * 1000) / 10
        const percentage2 = Math.round((1 - (receivedData.exit_line2 / receivedData.enter_line2)) * 1000) / 10

        k += "<tr>";
        k += "<td>" + selectedDate + "</td>";
        k += "<td>" + selectedShift + "</td>";
        k += "<td>" + receivedData.enter_tubes + "</td>";
        k += "<td>" + percentage + "</td>";
        k += "<td>" + receivedData.exit_tubes + "</td>";
        k += "</tr>";

        k += "<tr>";
        k += "<td>" + selectedDate + "</td>";
        k += "<td>" + selectedShift + "</td>";
        k += "<td>" + receivedData.enter_line2 + "</td>";
        k += "<td>" + percentage2 + "</td>";
        k += "<td>" + receivedData.exit_line2 + "</td>";
        k += "</tr>";

        table.innerHTML += k;

    }, 500)
}