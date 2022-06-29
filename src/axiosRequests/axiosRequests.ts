import axios from "axios";

// These axios defaults allows us to get the csrftoken of any django requests
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = "csrftoken";

export default class Operations {
    readonly API_URL:string
    constructor() {
        this.API_URL = 'http://192.100.1.50:7000/api'
    }

    // Получаем участки
    getUnits() {
        const url = `${this.API_URL}/units/`
        return axios.get(url)
    }

    // Получаем все операции по всем участкам
    getFullOperations() {
        const url = `${this.API_URL}/operations/`
        return axios.get(url)
    }

    getShiftInfo(pk:number | string) {
        const url = `${this.API_URL}/shift/${pk}`
        return axios.get(url)
    }
}